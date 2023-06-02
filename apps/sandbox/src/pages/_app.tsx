import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProtocolAuthProvider } from "@protoxyz/auth-react";
import { light } from "@protoxyz/auth-ui";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ProtocolAuthProvider
            publicKey={process.env.NEXT_PUBLIC_PXYZ_AUTH_PUBLIC_KEY}
            domain={process.env.NEXT_PUBLIC_PXYZ_AUTH_DOMAIN}
            baseTheme={light}
        >
            <Component {...pageProps} />
        </ProtocolAuthProvider>
    );
}
