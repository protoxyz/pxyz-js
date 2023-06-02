import clsx from "clsx";
import { IsLoggedIn } from "../components";
import { UserHeader } from "../components/UserHeader";
import { useMemo } from "react";

import { useProtocolAuth } from "@protoxyz/auth-react";

export interface CardLayoutProps {
    children?: React.ReactNode;
}
export function CardLayout({ children }: CardLayoutProps) {
    const { theme } = useProtocolAuth();

    const wrapperClasses = useMemo(() => {
        return clsx("flex h-screen min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8", theme?.backgroundColor);
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
            <div className={wrapperClasses}>{children}</div>
        </>
    );
}
