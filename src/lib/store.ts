import { createContext, useContext } from 'react'
import { makeAutoObservable, runInAction } from 'mobx'
import { first, last } from 'lodash-es';

import type { Data, Device, DeviceListStyle, LineFilter } from './types';
import { FETCH_URL, INIT_DEVICE_COUNT, LINE_FILTER_SEPARATOR, SHOW_MORE_DEVICE_COUNT } from './consts';

export class Store {
    public errorMessage = "";
    public requestingData: boolean = false;
    public searchInputValue: string = "";
    public lineFilter: LineFilter = {};
    /**
    *   `data` is undefined on store init as its expected to request data on page load
    *   If the request fails to receive data, we set it to null.
    *   Otherwise set received response data.
    */
    public data: Data | null | undefined = undefined;
    // For easier lookup of specific device in `data` array
    public deviceIndexMap: Map<string, number> = new Map();
    // For getAdjacentDeviceIds()
    public filteredDeviceIndexMap: Map<string, number> = new Map();
    public listStyle: DeviceListStyle = "table";
    public showDevicesCount: number = INIT_DEVICE_COUNT;

    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true });
        this.fetchData();
    }

    public getDeviceData(id: string | undefined): Device | undefined {
        if (!id || !this.data) {
            return;
        }

        const index = this.deviceIndexMap.get(id);

        if (index === undefined) {
            return;
        }

        return this.data.devices[index];
    }

    public getAdjacentDeviceIds(id: string | undefined, fallbackId: string): [string, string] {
        if (!id || !this.data || !this.filteredDeviceList.length) {
            return [fallbackId, fallbackId];
        }

        const [map, list]: [Map<string, number>, Device[]] = this.filteredDeviceIndexMap.size
            ? [this.filteredDeviceIndexMap, this.filteredDeviceList]
            : [this.deviceIndexMap, this.data.devices];
        const index = map.get(id);

        if (index === undefined) {
            return [fallbackId, fallbackId];
        }

        const previousDevice = list[index - 1] ?? last(list);
        const nextDevice = list[index + 1] ?? first(list);

        return [previousDevice.id, nextDevice.id];
    }

    public setSearchInputValue(value: string | null | undefined): void {
        this.searchInputValue = value?.trim() || "";
    }

    /** Array of line id's that are checked in the line filter dropdown */
    public get activeLineFilters(): string[] {
        return Object.keys(this.lineFilter).filter((lineId: string) => this.lineFilter[lineId]?.checked);
    }

    public setLineFilterData(activeLineFilters: string | null | undefined) {
        const activeLineFilterArray = activeLineFilters?.split(LINE_FILTER_SEPARATOR) || [];
        Object.values(this.lineFilter).forEach(line => {
            this.lineFilter[line.id].checked = activeLineFilterArray.includes(line.id);
        })
    }

    public get filteredDeviceList(): Device[] {
        runInAction(() => {
            // Reset how many devices we show
            this.showDevicesCount = INIT_DEVICE_COUNT;
            this.filteredDeviceIndexMap.clear();
        })

        if (!this.data) {
            return [];
        }

        const skipSearchFilter = !this.searchInputValue.length;
        const skipLineFilter = !this.activeLineFilters.length;

        if (skipSearchFilter && skipLineFilter) {
            return this.data.devices;
        }

        const regex = (new RegExp(this.searchInputValue, "gi"));

        let i = 0;
        return this.data.devices.filter(device => {
            const result =
                (skipSearchFilter || [device.product.name, ...device.shortnames, device.line.name].some(name => name.match(regex)))
                && (skipLineFilter || this.activeLineFilters.includes(device.line.id));

            if (result) {
                this.filteredDeviceIndexMap.set(device.id, i);
                i++;
            }

            return result;
        });
    }

    public async fetchData(): Promise<void> {
        this.deviceIndexMap.clear();
        this.errorMessage = "";
        try {
            this.requestingData = true;
            const response = await fetch(FETCH_URL);

            if (response.status == 404) {
                throw new Error("Page not found. Please check the fetch request URL.");
            }

            if (response.status == 500) {
                throw new Error("Internal server error. Please try again later.");
            }

            if (response.status == 429) {
                throw new Error("Too many requests. Please wait a moment and try again.")
            }

            if (!response.ok) {
                throw new Error(`Something went wrong. Please try again. Response status: ${response.status}`);
            }

            let result: Data;
            try {
                result = await response.json();
            } catch {
                throw new Error("Invalid JSON received from the server.");
            }

            if (!result?.devices?.length) {
                throw new Error("There is an issue with the received device list.");
            }

            runInAction(() => {
                this.data = result
                // Populate fields with data
                this.data.devices.forEach((device, index) => {
                    this.deviceIndexMap.set(device.id, index);
                    this.lineFilter[device.line.id] = {
                        id: device.line.id,
                        name: device.line.name,
                        checked: false,
                    };
                });

                // Set search and line filter values from URL search params if present
                const urlSearchParams = new URLSearchParams(window.location.search);
                this.setSearchInputValue(urlSearchParams.get("search"));
                this.setLineFilterData(urlSearchParams.get("line"));
                this.requestingData = false;
            });
        } catch (error) {
            this.data = null;
            this.requestingData = false;
            if (error instanceof Error) {
                this.errorMessage = error.message;
                console.error(error.message);
            }
        }
    }

    public setListStyle(listStyle: DeviceListStyle): void {
        this.listStyle = listStyle;
    }

    public showMoreDevices(): void {
        this.showDevicesCount += SHOW_MORE_DEVICE_COUNT;
    }
}

export const storeContext = createContext(new Store());

export function useStore() {
    return useContext(storeContext);
}
