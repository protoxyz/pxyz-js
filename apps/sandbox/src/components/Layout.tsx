import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <div className="z-10 w-full  max-w-5xl items-center justify-center font-mono text-sm lg:flex">
                {children}
            </div>
        </main>
    );
}

export default Layout;
