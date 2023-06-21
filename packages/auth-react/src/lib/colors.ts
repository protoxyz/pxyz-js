import { DEFAULT_PALETTE_CONFIG } from "./constants";
import { HSLToHex, hexToHSL, lightnessFromHSLum, luminanceFromHex } from "./helpers";
import { createDistributionValues, createHueScale, createSaturationScale } from "./scales";
import { PaletteConfig } from "./types";

export function createSwatches(palette: PaletteConfig) {
    const { value, valueStop } = palette;

    // Tweaks may be passed in, otherwise use defaults
    const useLightness = palette.useLightness ?? DEFAULT_PALETTE_CONFIG.useLightness;
    const h = palette.h ?? DEFAULT_PALETTE_CONFIG.h;
    const s = palette.s ?? DEFAULT_PALETTE_CONFIG.s;
    const lMin = palette.lMin ?? DEFAULT_PALETTE_CONFIG.lMin;
    const lMax = palette.lMax ?? DEFAULT_PALETTE_CONFIG.lMax;

    // Create hue and saturation scales based on tweaks
    const hueScale = createHueScale(h, valueStop);
    const saturationScale = createSaturationScale(s, valueStop);

    if (!hueScale || !saturationScale) {
        return [];
    }

    // Get the base hex's H/S/L values
    const { h: valueH, s: valueS, l: valueL } = hexToHSL(value);

    // Create lightness scales based on tweak + lightness/luminance of current value
    const lightnessValue = useLightness ? valueL : luminanceFromHex(value);
    const distributionScale = createDistributionValues(lMin, lMax, lightnessValue, valueStop);

    const swatches = hueScale.map(({ stop }, stopIndex) => {
        const hueScaleStop = hueScale[stopIndex];
        const saturationScaleStop = saturationScale[stopIndex];
        const distributionScaleStop = distributionScale[stopIndex];

        if (!hueScaleStop || !saturationScaleStop || !distributionScaleStop) {
            return null;
        }

        const newH = valueH + hueScaleStop.tweak;
        const newS = valueS + saturationScaleStop.tweak;
        const newL = useLightness
            ? distributionScaleStop.tweak
            : lightnessFromHSLum(newH, newS, distributionScaleStop.tweak);

        const newHex = HSLToHex(newH, newS, newL);

        const newHexValue = stop === valueStop ? value : newHex;

        return {
            stop,
            // Sometimes the initial value is changed slightly during conversion,
            // overriding that with the original value
            hex: newHexValue,
            // Used in graphs
            h: newH,
            hScale: hueScaleStop.tweak,
            s: newS,
            sScale: saturationScaleStop.tweak,
            l: newL,
        };
    });

    return swatches;
}
