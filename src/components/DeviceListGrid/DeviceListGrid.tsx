import { observer } from "mobx-react-lite";
import { Link, useSearchParams } from "react-router";
import { useMemo } from "react";

import { ShowMore } from "../ShowMore/ShowMore";

import { getImageSize, getImgSrc, imgOnError } from "../../lib/utils";
import { GRID_IMG_SIZE } from "../../lib/consts";
import { useStore } from "../../lib/store";
import type { Device } from "../../lib/types";

import "./DeviceListGrid.css";

function generateListElements(deviceList: Device[], showDevicesCount: number, search: string) {
    const imgSize = getImageSize(GRID_IMG_SIZE);
    return deviceList.slice(0, showDevicesCount).map(device => (
        <Link to={{ pathname: `/${device.id}`, search: search }} className="grid-item interactive" key={`grid-${device.id}`}>
            <div className="grid-item-thumbnail">
                <img
                    src={getImgSrc(device.id, device.images.default, imgSize)}
                    alt={device.shortnames[0]}
                    loading="lazy"
                    onError={imgOnError}
                />
            </div>
            <div className="grid-item-line-name">{device.line.name}</div>
            <div className="grid-item-headings">
                <div className="grid-item-name">{device.product.name}</div>
                <div className="grid-item-shortname">{device.shortnames[0]}</div>
            </div>
        </Link>
    ));
}

export const DeviceListGrid = observer(() => {
    const { showDevicesCount, filteredDeviceList } = useStore();
    const [search] = useSearchParams();

    const list = useMemo(
        () => generateListElements(filteredDeviceList, showDevicesCount, search.toString()),
        [filteredDeviceList, showDevicesCount]
    );

    return (
        <div className="vertical-scroll">
            <div className="grid-item-list">{list}</div>
            <ShowMore />
        </div>
    );
});

