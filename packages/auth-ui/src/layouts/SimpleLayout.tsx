import clsx from "clsx";

import { IsLoggedIn } from "../components";
import { UserHeader } from "../components/UserHeader";
import { useMemo } from "react";
import { useProtocolAuth } from "@protoxyz/auth-react";

export interface SimpleLayoutProps {
    children?: React.ReactNode;
}
export function SimpleLayout({ children }: SimpleLayoutProps) {
    const { theme } = useProtocolAuth();

    const wrapperClasses = useMemo(() => {
        return clsx("flex min-h-full px-4 sm:px-6 lg:px-8", theme?.backgroundColor);
    }, []);

    return (
        <>
            <IsLoggedIn>
                <UserHeader />
            </IsLoggedIn>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full"> 
        ```
      */}
            <div className={wrapperClasses}>
                <div className="mx-auto w-full max-w-7xl  ">{children}</div>
            </div>
        </>
    );
}
