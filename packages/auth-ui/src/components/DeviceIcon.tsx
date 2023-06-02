import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";
import { apple as Apple, google as Google } from "../icons/social";

import {
    windows as Windows,
    linux as Linux,
    android as Android,
    firefox as Firefox,
    mozilla as Mozilla,
} from "../icons/devices";

export interface DeviceIconProps {
    userAgent: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

const IconStyle = {
    width: "4rem",
    height: "4rem",
    color: "#71717a",
};

export function DeviceIcon({ userAgent, size = "xs" }: DeviceIconProps) {
    const manufacturer = useMemo(() => {
        if (userAgent.includes("Android")) {
            return "Android";
        } else if (userAgent.includes("iPhone")) {
            return "Apple";
        } else if (userAgent.includes("iPad")) {
            return "Apple";
        } else if (userAgent.includes("Macintosh")) {
            return "Apple";
        } else if (userAgent.includes("Windows")) {
            return "Microsoft";
        } else if (userAgent.includes("Linux")) {
            return "Linux";
        } else if (userAgent.includes("Chrome")) {
            return "Google";
        } else if (userAgent.includes("Firefox")) {
            return "Mozilla";
        } else {
            return "";
        }
    }, [userAgent]);

    const fullStyle = useMemo(() => {
        switch (size) {
            case "xs":
                return {
                    ...IconStyle,
                    width: "1rem",
                    height: "1rem",
                };
            case "sm":
                return {
                    ...IconStyle,
                    width: "2rem",
                    height: "2rem",
                };
            case "md":
                return {
                    ...IconStyle,
                    width: "3rem",
                    height: "3rem",
                };
            case "lg":
                return {
                    ...IconStyle,
                    width: "4rem",
                    height: "4rem",
                };
            case "xl":
                return {
                    ...IconStyle,
                    width: "5rem",
                    height: "5rem",
                };
            case "2xl":
                return {
                    ...IconStyle,
                    width: "6rem",
                    height: "6rem",
                };
            case "3xl":
                return {
                    ...IconStyle,
                    width: "7rem",
                    height: "7rem",
                };
            case "4xl":
                return {
                    ...IconStyle,
                    width: "8rem",
                    height: "8rem",
                };
            case "5xl":
                return {
                    ...IconStyle,
                    width: "9rem",
                    height: "9rem",
                };
            default:
                return IconStyle;
        }
    }, [size]);

    switch (manufacturer) {
        case "Apple":
            return <Apple style={fullStyle} />;
        case "Microsoft":
            return <Windows style={fullStyle} />;
        case "Linux":
            return <Linux style={fullStyle} />;
        case "Google":
            return <Google style={fullStyle} />;
        case "Mozilla":
            return <Mozilla style={fullStyle} />;
        case "Android":
            return <Android style={fullStyle} />;
        default:
            return <QuestionMarkCircleIcon style={fullStyle} />;
    }
}
