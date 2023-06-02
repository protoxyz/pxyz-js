import { Theme, ThemeProperties } from "@protoxyz/core";

export function deepMerge<T extends object>(base: T, ...others: T[]): T {
    return Object.assign({}, base, ...others);
}

export function mergeThemeCustomizationsAndBase(
    theme: Partial<Theme>,
    baseTheme: Partial<ThemeProperties> | undefined,
) {
    console.log("mergeThemeCustomizationsAndBase", theme?.properties, baseTheme);
    if (!baseTheme) return theme;

    let properties = deepMerge(baseTheme, theme?.properties ?? {});

    return {
        ...theme,
        properties,
    };
}
