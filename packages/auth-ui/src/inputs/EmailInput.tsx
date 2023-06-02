import clsx from "clsx";
import { InputProps } from "../types";
import { useProtocolAuth } from "@protoxyz/auth-react";

interface EmailInputProps extends InputProps {
    required?: boolean;
}
export function EmailInput({ placeholder, required }: EmailInputProps) {
    const { theme } = useProtocolAuth();

    return (
        <input
            id="email"
            name="email"
            type="email"
            placeholder={placeholder ?? ""}
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            required={required}
            className={
                clsx(
                    "block w-full appearance-none",
                    theme?.inputBgColor,
                    theme?.inputBorder,
                    theme?.inputBorderColor,
                    theme?.inputBorderRadius,
                    theme?.inputBoxShadow,
                    theme?.inputPaddingHorizontal,
                    theme?.inputPaddingVertical,
                    theme?.inputText,
                )
                // "block w-full appearance-none rounded-md border border-zinc-100 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-secondary-500 sm:text-sm",
            }
        />
    );
}
