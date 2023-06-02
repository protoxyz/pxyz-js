import { useProtocolAuth } from "@protoxyz/auth-react";
import { PrimaryButton, VerificationInput } from "../inputs";
import { AuthVerificationStrategy } from "@protoxyz/core";

interface PhoneVerificationProps {
    mode: "sign-in" | "sign-up";
}
export function PhoneVerification({ mode }: PhoneVerificationProps) {
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

    const onAttemptPhoneVerification = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const code = formData.get("code")?.toString() || "";

        if (mode === "sign-in") {
            attemptSignInFirstFactor({ code, strategy: AuthVerificationStrategy.phone_code });
        } else {
            attemptSignUpVerification({ code, strategy: AuthVerificationStrategy.phone_code });
        }
    };

    const phone = signUpAttempt?.phone || signInAttempt?.identifier;
    const loading = isAttemptingSignUpVerification || isAttemptingSignInFirstFactor;
    const error = signUpError?.error ?? signInError?.error;

    return (
        <div className="space-y-6">
            <div className="text-xl font-bold text-zinc-900">Verify Phone Number</div>
            <div className="text-md text-zinc-400">
                Enter the 6-digit verification code we just texted to <b className="text-zinc-900">{phone}</b>.
            </div>

            <form onSubmit={loading ? undefined : onAttemptPhoneVerification} className="flex flex-col space-y-6">
                <VerificationInput placeholder="" />
                <PrimaryButton type="submit" loading={loading}>
                    Verify
                </PrimaryButton>
                {error && <div className="text-sm text-red-500">{error}</div>}
            </form>
        </div>
    );
}
