import { ThemeHeaderPlacement } from "../types";

export function getWindowError() {
    if (typeof window !== undefined && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        return params.get("error");
    }

    return null;
}

export const hexIsDark = (hex: string | null | undefined) => {
    if (!hex) return false;

    const c = hex.substring(1); // strip #
    const rgb = parseInt(c, 16); // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma < 90;
};

export const textColorForBackground = (
    hex: string | null | undefined,
    headerPlacement: ThemeHeaderPlacement | undefined,
) => {
    if (headerPlacement === ThemeHeaderPlacement.inside) return "#18181b";
    return hexIsDark(hex) ? "#ffffff" : "#18181b";
};
