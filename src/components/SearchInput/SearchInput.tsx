import { observer } from "mobx-react-lite";
import { debounce } from "lodash-es";
import { useSearchParams } from "react-router";
import { useCallback, useEffect, type BaseSyntheticEvent } from "react";

import { useStore } from "../../lib/store";
import { preventDefaultNoop } from "../../lib/utils";
import { SEARCH_DEBOUNCE_TIME } from "../../lib/consts";

import "./SearchInput.css";

export const SearchInput = observer(() => {
    const { setSearchInputValue } = useStore();
    const [search, setSearch] = useSearchParams();

    const inputOnChange = useCallback((e: BaseSyntheticEvent) => {
        const value = e.target.value;
        setSearch({ search: value, line: search.get("line") || "" });
    }, [search]);

    const setSearchValueInStore = useCallback(debounce((value) => {
        setSearchInputValue(value);
    }, SEARCH_DEBOUNCE_TIME), []);

    useEffect(() => {
        setSearchValueInStore(search.get("search"));
    }, [search])

    return (
        <div className="device-search">
            <form onSubmit={preventDefaultNoop}>
                <input
                    className="interactive"
                    id="device-search"
                    placeholder="Search"
                    onChange={inputOnChange}
                    value={search.get("search") || ""}
                />
            </form>
        </div>
    )
})