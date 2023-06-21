"use client";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { SignIn } from "../sign-in";
import { Button, ButtonProps } from "../../ui/button";
import { DialogContent } from "../../ui/dialog";
import { useProtocolAuth } from "../../../contexts/protocol-context";
import { useCallback, useMemo } from "react";

interface SignInButtonProps {
    mode: "popup" | "redirect";
    children?: React.ReactNode;
    text?: string;
    button?: ButtonProps;
}

export function SignInButton({ mode = "redirect", children, button, text = "Sign in" }: SignInButtonProps) {
    // const { appearance } = useProtocolAuthAppearance({ component: "signIn" });
    const { instance } = useProtocolAuth();

    const redirectToSignIn = useCallback(() => {
        if (mode === "popup") return;
        window.location.href = instance?.signInUri ?? "/sign-in";
    }, [instance, mode]);

    const childContent = useMemo(() => {
        if (children) {
            return <div onClick={redirectToSignIn}>{children}</div>;
        }

        return (
            <Button onClick={redirectToSignIn} {...button} className="z-10">
                {text}
            </Button>
        );
    }, [children]);

    switch (mode) {
        case "redirect":
            return childContent;
        case "popup": {
            return (
                <Dialog>
                    <DialogTrigger asChild>{childContent}</DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <SignIn />
                    </DialogContent>
                </Dialog>
            );
        }
    }
}
