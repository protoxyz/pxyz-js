import { cn } from "../../lib/utils";

interface SpinnerProps {
    className?: string;
    color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "white" | "black";
    size?: "sm" | "md" | "lg";
}
export function Spinner({ className, color = "primary", size = "md" }: SpinnerProps) {
    const colorClasses = {
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        danger: "text-danger",
        warning: "text-warning",

        info: "text-info",
        light: "text-light",
        dark: "text-dark",

        white: "text-white",
        black: "text-black",

        muted: "text-muted",

        foreground: "text-foreground",
    }[color];

    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
    }[size];

    return (
        <svg
            className={cn(colorClasses, sizeClasses, className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="0.75s"
                    values="0 12 12;360 12 12"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    );
}
