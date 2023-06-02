import clsx from "clsx";

import { IsLoggedIn } from "../components";
import { UserHeader } from "../components/UserHeader";
import { useMemo } from "react";
import { useProtocolAuth } from "@protoxyz/auth-react";

export interface SplitLayoutProps {
    children?: React.ReactNode;
}

export function SplitLayout({ children }: SplitLayoutProps) {
    const { theme } = useProtocolAuth();

    const wrapperClasses = useMemo(() => {
        return clsx("relative hidden w-0 flex-1 lg:block", theme?.backgroundColor);
    }, []);

    return (
        <>
            <IsLoggedIn>
                <UserHeader />
            </IsLoggedIn>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
            {/* <div className="flex h-screen min-h-full">
                <div
                    className={clsx(
                        "flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24",
                    )}
                    style={{ backgroundColor: backgroundHex }}
                >
                    <div className="mx-auto w-full max-w-sm lg:w-96">{children}</div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={appearance?.backgroundImage || ""}
                        alt=""
                    />
                </div>
            </div> */}

            <div className="flex h-screen min-h-full flex-row ">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="mt-8">{children}</div>
                    </div>
                </div>
                <div className={wrapperClasses}>
                    {theme?.backgroundImage && (
                        <img
                            className="absolute inset-0 h-full w-full object-cover"
                            src={theme?.backgroundImage || ""}
                            alt=""
                        />
                    )}
                </div>
            </div>
        </>
    );
}
