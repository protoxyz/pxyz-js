import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { SignUp } from "../sign-up";
import { Button, ButtonProps } from "../../ui/button";
import { DialogContent } from "../../ui/dialog";
import { useProtocolAuth } from "../../../contexts/protocol-context";
import { useCallback, useMemo } from "react";

interface SignUpButtonProps {
    mode: "popup" | "redirect";
    children?: React.ReactNode;
    text?: string;
    button?: ButtonProps;
}

export function SignUpButton({ mode = "redirect", children, button, text = "Sign up" }: SignUpButtonProps) {
    // const { appearance } = useProtocolAuthAppearance({ component: "signUp" });
    const { instance } = useProtocolAuth();

    const redirectToSignUp = useCallback(() => {
        if (mode === "popup") return;
        window.location.href = instance?.signUpUri ?? "/sign-up";
    }, [instance, mode]);

    const childContent = useMemo(() => {
        if (children) {
            return <div onClick={redirectToSignUp}>{children}</div>;
        }

        return (
            <Button onClick={redirectToSignUp} {...button} className="z-10">
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
                        <SignUp />
                    </DialogContent>
                </Dialog>
            );
        }
    }
}
