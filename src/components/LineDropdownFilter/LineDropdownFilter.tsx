import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useRef, useState, type BaseSyntheticEvent } from "react";
import { action } from "mobx";
import { useSearchParams } from "react-router";
import cn from "classnames";

import { useStore } from "../../lib/store";
import { preventDefaultNoop, setValueFactory } from "../../lib/utils";
import { LINE_FILTER_SEPARATOR } from "../../lib/consts";
import type { LineFilterData } from "../../lib/types";

import "./LineDropdownFilter.css";

export const LineDropdownFilter = observer(() => {
    const lineFilterRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    const { lineFilter, setLineFilterData, activeLineFilters } = useStore();
    const [search, setSearch] = useSearchParams();
    const disabled = !Object.keys(lineFilter).length;


    const resetLineFilters = useCallback(() => {
        setSearch({ search: search.get("search") || "", line: "" });
    }, [search]);

    const checkboxOnChange = useCallback((e: BaseSyntheticEvent) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const lineSearchValue = search.get("line");

        const updatedActiveLineFilterList: string[] = Object.values(lineFilter).reduce((list: string[], line: LineFilterData) => {
            if (line.id === name && checked || line.id !== name && lineSearchValue?.includes(line.id)) {
                list.push(line.id);
            }
            return list;
        }, []);
        setSearch({
            search: search.get("search") || "",
            line: updatedActiveLineFilterList.join(LINE_FILTER_SEPARATOR)
        });
    }, [search]);

    useEffect(action(() => {
        setLineFilterData(search.get("line"));
    }), [search])

    useEffect(() => {
        function handlePointerEventDown(e: PointerEvent) {
            if (lineFilterRef.current && e.target instanceof Node && !lineFilterRef.current.contains(e.target)) {
                setVisible(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerEventDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerEventDown);
        }
    }, [lineFilterRef]);


    const lineList = useMemo(
        () => Object.values(lineFilter).map((lineFilterData: LineFilterData) => (
            <div className="line-list-item" key={`line-${lineFilterData.id}`}>
                <label className="interactive">
                    <input
                        name={lineFilterData.id}
                        type="checkbox"
                        checked={activeLineFilters.includes(lineFilterData.id)}
                        key={lineFilterData.id}
                        onChange={checkboxOnChange}
                    />
                    {lineFilterData.name}
                </label>
            </div>
        )),
        [activeLineFilters, search, checkboxOnChange, lineFilter]
    );

    return (
        <div className="line-filter" ref={lineFilterRef}>
            <button
                className={cn('line-filter-button interactive', {
                    'open': visible,
                    'disabled': disabled,
                })}
                disabled={disabled}
                onClick={setValueFactory(setVisible, !visible)}
            >
                Filter
            </button>
            {visible && (
                <div className="line-filter-dropdown">
                    <div className="dropdown-title">Product line</div>
                    <form className="dropdown-line-list" onSubmit={preventDefaultNoop}>
                        {lineList}
                    </form>
                    <button className="interactive dropdown-reset-filter" onClick={resetLineFilters} disabled={!activeLineFilters.length}>Reset</button>
                </div>
            )}
            {!!activeLineFilters.length && <div className="line-filter-active-count">{activeLineFilters.length}</div>}
        </div>
    )
})