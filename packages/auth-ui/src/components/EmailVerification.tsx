import { useProtocolAuth } from "@protoxyz/auth-react";
import { PrimaryButton, VerificationInput } from "../inputs";
import { AuthVerificationStrategy } from "@protoxyz/core";
import { Heading, Subheading } from "./Heading";

interface EmailVerificationProps {
    mode: "sign-in" | "sign-up";
}
export function EmailVerification({ mode }: EmailVerificationProps) {
    const {
        theme,
        signInAttempt,
        signInError,
        attemptSignInFirstFactor,
        signUpAttempt,
        signUpError,
        attemptSignUpVerification,
        isAttemptingSignUpVerification,
        isAttemptingSignInFirstFactor,
    } = useProtocolAuth();

    const onAttemptEmailVerification = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const code = formData.get("code")?.toString() || "";

        if (mode === "sign-in") {
            attemptSignInFirstFactor({ code, strategy: AuthVerificationStrategy.email_code });
        } else {
            attemptSignUpVerification({ code, strategy: AuthVerificationStrategy.email_code });
        }
    };

    const email = signUpAttempt?.email || signInAttempt?.identifier;
    const loading = isAttemptingSignUpVerification || isAttemptingSignInFirstFactor;
    const error = signUpError?.error ?? signInError?.error;

    return (
        <div className="mt-10 space-y-6">
            <Heading>Verify Email Address</Heading>
            <Subheading>
                Enter the 6-digit verification code we just emailed to <b>{email}</b>.
            </Subheading>

            <form onSubmit={loading ? undefined : onAttemptEmailVerification} className="flex flex-col space-y-6">
                <VerificationInput placeholder="" />
                <PrimaryButton type="submit" loading={loading}>
                    Verify
                </PrimaryButton>
                {error && <div className="text-sm text-red-500">{error}</div>}
            </form>
        </div>
    );
}
