import { Route, Routes } from "react-router";

import { DeviceDetails } from "./views/DeviceDetails/DeviceDetails.tsx";
import { Header } from "./components/Header/Header.tsx";
import { Content } from "./views/Content.tsx";

import "./App.css";

export const App = () => (
    <>
        <Header />
        <main>
            <Routes>
                <Route path="/" element={<Content />}>
                    <Route
                        index
                        path="/:id"
                        element={<DeviceDetails />}
                    />
                </Route>
            </Routes>
        </main>
    </>
);

