import { observer } from "mobx-react-lite";
import { Link, useSearchParams } from "react-router";
import { useMemo } from "react";

import { ShowMore } from "../ShowMore/ShowMore";

import { getImageSize, getImgSrc, imgOnError } from "../../lib/utils";
import { TABLE_IMG_SIZE } from "../../lib/consts";
import { useStore } from "../../lib/store";
import type { Device } from "../../lib/types";

import "./DeviceListTable.css";

function generateListElements(deviceList: Device[], showDevicesCount: number, search: string) {
    const imgSize = getImageSize(TABLE_IMG_SIZE);
    return deviceList.slice(0, showDevicesCount).map(device => (
        <Link to={{ pathname: `/${device.id}`, search: search }} className="device-list-row" key={`table-${device.id}`}>
            <div className="device-list-image-col">
                <img
                    src={getImgSrc(device.id, device.images.default, imgSize)}
                    alt={device.shortnames[0]}
                    loading="lazy"
                    onError={imgOnError}
                />
            </div>
            <div className="device-list-col line-col">{device.line.name}</div>
            <div className="device-list-col name-col">{device.product.name}</div>
        </Link>
    ));
}

export const DeviceListTable = observer(() => {
    const { showDevicesCount, filteredDeviceList } = useStore();
    const [search] = useSearchParams();

    const list = useMemo(
        () => generateListElements(filteredDeviceList, showDevicesCount, search.toString()),
        [filteredDeviceList, showDevicesCount]
    );

    return (
        <div className="vertical-scroll">
            <div className="device-list-header">
                <div className="device-list-image-col" />
                <div className="device-list-col">Product Line</div>
                <div className="device-list-col">Name</div>
            </div>
            {list}
            <ShowMore />
        </div>
    );
});

