import { Outlet } from "react-router";
import { observer } from "mobx-react-lite";

import { DeviceList } from "./DeviceList/DeviceList.tsx";
import { ErrorPage } from "./ErrorPage/ErrorPage.tsx";

import { useStore } from "../lib/store.ts";

export const Content = observer(() => {
    const { data } = useStore();

    if (!data) {
        return <ErrorPage
            showOnlyLogo={data === undefined}
            showRetryButton={data === null}
        />
    }

    return (
        <>
            <DeviceList />
            <Outlet />
        </>
    );
});

