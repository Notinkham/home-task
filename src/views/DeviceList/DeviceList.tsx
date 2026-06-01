import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import cn from "classnames";

import { DeviceListTable } from "../../components/DeviceListTable/DeviceListTable.tsx";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel.tsx";
import { DeviceListGrid } from "../../components/DeviceListGrid/DeviceListGrid.tsx";

import { useStore } from "../../lib/store.ts";

import "./DeviceList.css";

export const DeviceList = observer(() => {
    const { id } = useParams();
    const { listStyle } = useStore();

    return (
        <div className={cn('device-list', { 'hide': !!id })}>
            <FilterPanel />
            {listStyle === "table" && <DeviceListTable />}
            {listStyle === "grid" && <DeviceListGrid />}
        </div>
    );
});
