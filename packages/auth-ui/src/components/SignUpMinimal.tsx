import { Localization } from "../types";
import { EmailInput, PhoneInput } from "../inputs";
import { PrimaryButton } from "../inputs/Button";
import { enUS } from "../localizations";
import { getWindowError } from "../utils";
import { useProtocolAuth } from "@protoxyz/auth-react";
import { CreateSignUpAttemptOptions } from "@protoxyz/core";
import { useEffect, useMemo, useState } from "react";
import { EmailVerification } from "./EmailVerification";
import { PhoneVerification } from "./PhoneVerification";

export interface SignUpMinimalProps {
    localization?: Localization;
}
export function SignUpMinimal({ localization = enUS }: SignUpMinimalProps) {
    const [queryError, setQueryError] = useState("" as string | null);

    const { theme } = useProtocolAuth();

    useEffect(() => {
        setQueryError(getWindowError());
    }, []);

    const { instance, createSignUpAttempt, isCreatingSignUpAttempt, signUpAttempt, signUpError } = useProtocolAuth();

    const onCreateSignUpAttempt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString();
        const phone = formData.get("phone")?.toString();

        let data = { email } as CreateSignUpAttemptOptions["body"];

        createSignUpAttempt(data);
    };

    if (!instance) {
        return null;
    }

    const missingVerifications = signUpAttempt?.missingVerifications || [];
    const missingVerification = missingVerifications.length > 0 ? missingVerifications[0] : null;

    return (
        <div className="w-full ">
            {missingVerification && missingVerification === "phone" && <PhoneVerification mode="sign-up" />}
            {missingVerification && missingVerification === "email" && <EmailVerification mode="sign-up" />}

            {!signUpAttempt && (
                <form
                    method="POST"
                    className="ring-white/15 relative flex items-center rounded-md py-1 ring-1"
                    onSubmit={onCreateSignUpAttempt}
                >
                    {instance?.identifierEmailAddress && (
                        <EmailInput placeholder="" required={instance.emailAddressRequired} />
                    )}
                    {instance?.identifierPhoneNumber && (
                        <PhoneInput placeholder="" required={instance.phoneNumberRequired} />
                    )}
                    <PrimaryButton
                        type="submit"
                        loading={isCreatingSignUpAttempt}
                        arrow
                        className="mr-1 hover:opacity-75"
                    >
                        {theme?.signUpSubmitText || localization.signUp_submitText}
                    </PrimaryButton>
                    {/* <div className="peer-focus:ring-sky-300/15 absolute inset-1 -z-10 rounded-lg transition peer-focus:ring-4" />
                    <div className="bg-white/2.5 ring-white/15 absolute inset-0 -z-10 rounded-lg ring-1 transition peer-focus:ring-sky-300" /> */}
                </form>
            )}

            {queryError && <div className="text-sm text-red-500">{queryError}</div>}
            {signUpError && <div className="text-sm text-red-500">{signUpError?.error}</div>}
        </div>
    );
}
