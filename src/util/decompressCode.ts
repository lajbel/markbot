import pako from "pako";

export function decompressCode(str: string) {
    return pako.inflate(
        new Uint8Array(atob(str).split("").map((c) => c.charCodeAt(0))),
        { to: "string" },
    );
}
