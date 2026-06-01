import { observer } from "mobx-react-lite";

import { useStore } from "../../lib/store.ts";

import "./ShowMore.css";

export const ShowMore = observer(() => {
    const { showMoreDevices, filteredDeviceList, showDevicesCount } = useStore();

    if (showDevicesCount > filteredDeviceList.length) {
        return null;
    }

    return (
        <div className="load-more-row"><button className="interactive cta" onClick={showMoreDevices}>Show More</button></div>
    );
});

