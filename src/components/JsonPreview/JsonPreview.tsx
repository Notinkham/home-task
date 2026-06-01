import { useMemo, useRef } from "react";

import "./JsonPreview.css";
import { Copy } from "../SVG/Copy";
import { NewTab } from "../SVG/NewTab";

type TokenType = "key" | "string" | "number" | "boolean" | "null" | "punctuation";

interface Token {
    type: TokenType;
    value: string;
}

const TOKEN_COLORS: Record<TokenType, string> = {
    key: "var(--json-key)",
    string: "var(--json-string)",
    number: "var(--json-number)",
    boolean: "var(--json-boolean)",
    null: "var(--json-null)",
    punctuation: "var(--json-punctuation)",
};

function tokenize(json: string): Token[] {
    const tokens: Token[] = [];
    const regex =
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|true|false|null|-?\d+\.?\d*([eE][+-]?\d+)?|[{}[\],:])/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(json)) !== null) {
        if (match.index > lastIndex) {
            tokens.push({ type: "punctuation", value: json.slice(lastIndex, match.index) });
        }

        const val = match[0];
        let type: TokenType = "punctuation";

        if (/^"/.test(val)) {
            type = /:$/.test(val) ? "key" : "string";
        } else if (val === "true" || val === "false") {
            type = "boolean";
        } else if (val === "null") {
            type = "null";
        } else if (/^-?\d/.test(val)) {
            type = "number";
        }

        tokens.push({ type, value: val });
        lastIndex = match.index + val.length;
    }

    if (lastIndex < json.length) {
        tokens.push({ type: "punctuation", value: json.slice(lastIndex) });
    }

    return tokens;
}

function tryParse(raw: string): unknown | null {
    try {
        return JSON.parse(raw);
    } catch {
        try {
            // eslint-disable-next-line no-new-func
            return Function('"use strict"; return (' + raw + ")")();
        } catch {
            return null;
        }
    }
}

interface JsonHighlighterProps {
    /** Initial JSON string or JS object to display */
    value?: string | object;
}

/**
* Usage example:
*   <JsonHighlighter value='{"name": "Alice", "age": 30}' />
*/
export function JsonPreview({
    value = "",
}: JsonHighlighterProps) {
    const initial = typeof value === "string" ? value : JSON.stringify(value, null, 2);
    const preRef = useRef<HTMLPreElement | null>(null);

    const tokens = useMemo(() => {
        if (!initial.trim()) return null;
        const parsed = tryParse(initial);
        if (parsed === null) return null;
        const pretty = JSON.stringify(parsed, null, 2);
        return tokenize(pretty);
    }, []);

    function openInNewTab() {
        const json = JSON.stringify(value);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    }

    function copyJsonToClipboard() {
        if (preRef.current) {
            window.navigator.clipboard.writeText(preRef.current.textContent);
        }
    }

    return (
        <div className="json-preview">
            {tokens && (
                <>
                    <div className="json-preview-controls">
                        <button className="interactive" onClick={copyJsonToClipboard}><Copy className="controls-icon" /></button>
                        <button className="interactive" onClick={openInNewTab}><NewTab className="controls-icon" /></button>
                    </div>
                    <pre ref={preRef}>
                        {tokens.map((token, i) => (
                            <span key={i} style={{ color: TOKEN_COLORS[token.type] }}>{token.value}</span>
                        ))}
                    </pre>
                </>
            )}
        </div>
    );
}