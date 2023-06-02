import clsx from "clsx";
import { InputProps } from "../types";
import { Label } from "./Label";
import { useProtocolAuth } from "@protoxyz/auth-react";

export function PasswordInput(props: InputProps) {
    const { theme } = useProtocolAuth();
    return (
        <div>
            <div className="mt-1">
                <input
                    {...props}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={clsx(
                        "block w-full appearance-none",
                        theme?.inputBgColor,
                        theme?.inputBorder,
                        theme?.inputBorderColor,
                        theme?.inputBorderRadius,
                        theme?.inputBoxShadow,
                        theme?.inputPaddingHorizontal,
                        theme?.inputPaddingVertical,
                        theme?.inputText,
                    )}
                />
            </div>
        </div>
    );
}
