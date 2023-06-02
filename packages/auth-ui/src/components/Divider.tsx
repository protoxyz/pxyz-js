import { useProtocolAuth } from "@protoxyz/auth-react";
import clsx from "clsx";

export function Divider() {
    const { theme } = useProtocolAuth();

    return (
        <div className={"relative my-6"}>
            <div className="absolute inset-0 flex items-center">
                <div className={clsx("w-full border-t", theme?.dividerColor)} />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className={clsx(" px-2", theme?.dividerTextBgColor, theme?.dividerTextColor)}>
                    Or continue with
                </span>
            </div>
        </div>
    );
}
