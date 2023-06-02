import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

import { useMemo } from "react";
import {
    // windows as Windows,
    // linux as Linux,
    // android as Android,
    firefox as Firefox,
    // mozilla as Mozilla,
    googlechrome as GoogleChrome,
    safari as Safari,
    microsoftedge as MicrosoftEdge,
} from "../icons/devices";

// import { apple as Apple, google as Google } from "../icons/social";

export interface BrowserIconProps {
    userAgent: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

const IconStyle = {
    width: "4rem",
    height: "4rem",
    color: "#71717a",
};

export function BrowserIcon({ userAgent, size = "xs" }: BrowserIconProps) {
    const browser = useMemo(() => {
        if (userAgent.includes("Chrome")) {
            return "Chrome";
        } else if (userAgent.includes("Firefox")) {
            return "Firefox";
        } else if (userAgent.includes("Safari")) {
            return "Safari";
        } else if (userAgent.includes("Edge")) {
            return "Edge";
        } else if (userAgent.includes("Opera")) {
            return "Opera";
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

    switch (browser) {
        case "Chrome":
            return <GoogleChrome style={fullStyle} />;
        case "Firefox":
            return <Firefox style={fullStyle} />;
        case "Safari":
            return <Safari style={fullStyle} />;
        case "Edge":
            return <MicrosoftEdge style={fullStyle} />;
        case "Opera":
            return <div style={{ fontSize: 8, color: "#a1a1aa" }}>opera</div>;

        default:
            return <QuestionMarkCircleIcon style={fullStyle} />;
    }
}
