import { observer } from "mobx-react-lite";
import cn from "classnames";

import { Table } from "../SVG/Table";
import { Grid } from "../SVG/Grid";
import { SearchInput } from "../SearchInput/SearchInput";
import { LineDropdownFilter } from "../LineDropdownFilter/LineDropdownFilter";

import { useStore } from "../../lib/store";
import { setValueFactory } from "../../lib/utils";

import "./FilterPanel.css";

export const FilterPanel = observer(() => {
    const { listStyle, setListStyle, filteredDeviceList } = useStore();
    return (
        <div className="filter-panel">
            <div className="filter-left">
                <SearchInput />
                <span>{filteredDeviceList.length} Devices</span>
            </div>
            <div className="filter-right">
                <div className="filter-style-buttons">
                    <button
                        className={cn('layout-button interactive', { 'active': listStyle === "table" })}
                        onClick={setValueFactory(setListStyle, "table")}
                    >
                        <Table className="layout-icon" />
                    </button>
                    <button
                        data-list-style="grid"
                        className={cn('layout-button interactive', { 'active': listStyle === "grid" })}
                        onClick={setValueFactory(setListStyle, "grid")}
                    >
                        <Grid className="layout-icon" />
                    </button>
                </div>
                <LineDropdownFilter />
            </div>
        </div>
    );
});

