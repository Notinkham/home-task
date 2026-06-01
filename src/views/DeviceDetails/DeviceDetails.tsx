import { Link, useParams, useSearchParams } from "react-router";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import cn from "classnames";

import { Text } from "../../components/SVG/Text";
import { Json } from "../../components/SVG/Json";
import { JsonPreview } from "../../components/JsonPreview/JsonPreview";
import { ErrorPage } from "../../views/ErrorPage/ErrorPage";

import { useStore } from "../../lib/store";
import { getImageSize, getImgSrc, imgOnError, setValueFactory } from "../../lib/utils";
import { DETAILS_IMG_SIZE, DEVICE_SPECS_LIST } from "../../lib/consts";
import type { Device, DeviceDetailsStyle, DeviceSpecsTuple } from "../../lib/types";

import "./DeviceDetails.css";

function generateSpecList(device: Device) {
    return DEVICE_SPECS_LIST.map(([specName, getSpecValue, pre, post]: DeviceSpecsTuple) => {
        const specValue = getSpecValue(device);
        if (specValue === 0) {
            return null;
        }

        return (
            <div className="device-spec-row" key={`spec-${device.id}-${specName}`}>
                <span>{specName}</span>
                <span>{[pre, specValue, post].join(" ")}</span>
            </div>
        );
    });
}

export const DeviceDetails = observer(() => {
    const { id } = useParams();
    const { getDeviceData, getAdjacentDeviceIds } = useStore();
    const [detailsStyle, setDetailsStyle] = useState<DeviceDetailsStyle>("text");
    const [search] = useSearchParams();

    const deviceData = getDeviceData(id);

    if (!deviceData) {
        return <div className="device-details"><ErrorPage showHomeButton={true} /></div>
    }

    const [prevDeviceId, nextDeviceId] = getAdjacentDeviceIds(id, deviceData.id);
    const specList = useMemo(
        () => generateSpecList(deviceData),
        [id]
    );

    const imgSize = getImageSize(DETAILS_IMG_SIZE);
    return (
        <div className="device-details">
            <div className="details-controls">
                <div className="controls-left">
                    <Link to={{ pathname: "/", search: search.toString() }} className="controls-button interactive"><i />Back</Link>
                </div>
                <div className="controls-style-toggle">
                    <button
                        onClick={setValueFactory(setDetailsStyle, "text")}
                        className={cn('interactive', { 'active': detailsStyle === "text" })}
                    >
                        <Text className="toggle-icon" />Text
                    </button>
                    <button
                        onClick={setValueFactory(setDetailsStyle, "json")}
                        className={cn('interactive', { 'active': detailsStyle === "json" })}
                    >
                        <Json className="toggle-icon" />JSON
                    </button>
                </div>
                <div className="controls-right">
                    <Link
                        to={{ pathname: `/${prevDeviceId}`, search: search.toString() }}
                        onClick={setValueFactory(setDetailsStyle, "text")}
                        className="controls-button interactive"
                    >
                        <i />
                    </Link>
                    <Link
                        to={{ pathname: `/${nextDeviceId}`, search: search.toString() }}
                        onClick={setValueFactory(setDetailsStyle, "text")}
                        className="controls-button interactive"
                    >
                        <i data-inverse />
                    </Link>
                </div>
            </div>
            {detailsStyle === "json" && (
                <JsonPreview value={deviceData} />
            )}
            {detailsStyle === "text" && (
                <div className="details">
                    <img
                        src={getImgSrc(deviceData.id, deviceData.images.default, imgSize)}
                        alt={deviceData.shortnames[0]}
                        onError={imgOnError}
                        key={deviceData.id}
                    />
                    <div className="device-specifications">
                        <div className="device-name">{deviceData.product.name}</div>
                        <div className="device-line">{deviceData.line.name}</div>
                        <div className="device-spec-list">
                            <div className="device-spec-row">
                                <span>Product Line</span>
                                <span>{deviceData.line.name}</span>
                            </div>
                            <div className="device-spec-row">
                                <span>ID</span>
                                <span>{deviceData.line.id}</span>
                            </div>
                            <div className="device-spec-row">
                                <span>Name</span>
                                <span>{deviceData.product.name}</span>
                            </div>
                            <div className="device-spec-row">
                                <span>Short Name</span>
                                <span>{deviceData.shortnames[0]}</span>
                            </div>
                            {specList}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});
