import { observer } from "mobx-react-lite";
import { Link, } from "react-router";
import cn from "classnames";

import { Logo } from "../../components/SVG/Logo";

import { useStore } from "../../lib/store";

import "./ErrorPage.css";

interface ErrorPageProps {
    showHomeButton?: boolean;
    showRetryButton?: boolean;
    showOnlyLogo?: boolean;
}

export const ErrorPage = observer(({ showHomeButton, showRetryButton, showOnlyLogo }: ErrorPageProps) => {
    const { requestingData, fetchData, errorMessage } = useStore();

    return (
        <div className={cn('error-page', { 'requesting-data': requestingData })}>
            <Logo className="error-page-logo" />
            {!showOnlyLogo && (
                <>
                    <span>{errorMessage || "There seems to be an issue"}</span>
                    <div>
                        {showRetryButton && <button className="error-page-button interactive cta" onClick={fetchData}>Retry</button>}
                        {showHomeButton && <Link className="error-page-button interactive cta" to="/" reloadDocument>Home</Link>}
                    </div>
                </>
            )}
        </div>
    )
})