import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useProtocolAuth } from "@/providers/protocol";
import clsx from "clsx";
import Link from "next/link";

export function SecuredBy() {
    const { theme } = useProtocolAuth();
    return (
        <div
            className={clsx(
                theme?.securedByProtocolBgColor,
                theme?.securedByProtocolTextColor,
                " mt-5 flex items-center justify-center gap-1 rounded-lg p-2 text-center text-xs ",
            )}
        >
            <LockClosedIcon className="h-3 w-3" />
            Secured by
            <Link
                href="https://pxyz.dev"
                target="_blank"
                rel="noreferrer"
                title="Protocol Auth"
                className={clsx("font-semibold", theme?.securedByProtocolProtocolColor)}
            >
                Protocol
            </Link>
        </div>
    );
}
