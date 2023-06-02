import clsx from "clsx";
import { useProtocolAuth } from "@protoxyz/auth-react";

interface LabelProps {
    label: string;
    htmlFor?: string;
    required?: boolean;
}
export function Label({ label, required, htmlFor }: LabelProps) {
    const { theme } = useProtocolAuth();

    return (
        <label
            htmlFor={htmlFor}
            className={clsx("block", theme?.labelColor, theme?.labelFontSize, theme?.labelFontWeight)}
        >
            {label} {required && <span className="text-red-600">*</span>}
        </label>
    );
}
