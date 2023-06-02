import { Theme, ThemeProperties } from "@protoxyz/core";

export function deepMerge<T extends object>(base: T, ...others: T[]): T {
    return Object.assign({}, base, ...others);
}

export function mergeThemeCustomizationsAndBase(
    theme: Partial<Theme>,
    baseTheme: Partial<ThemeProperties> | undefined,
) {
    if (!baseTheme) return theme;

    const properties = deepMerge(baseTheme, theme?.properties ?? {});

    return {
        ...theme,
        properties,
    };
}
