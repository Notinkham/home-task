import { Link } from "react-router";

import { Logo } from "../SVG/Logo.tsx";

import "./Header.css";

export const Header = () => (
    <header>
        <div className="header-left">
            <Link to="/" className="header-logo-container interactive"><Logo className="header-logo" /></Link>
            <span>Devices</span>
        </div>
        <span className="header-right">
            Alvis Alferovs
        </span>
    </header>
);

