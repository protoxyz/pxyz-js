import { CheckCircleIcon, EnvelopeIcon, ExclamationCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ResponseStatus } from "@protoxyz/core";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/inputs/Button";
import { EmailInput } from "@/components/ui/inputs/EmailInput";
import { VerificationInput } from "@/components/ui/inputs/VerificationCodeInput";
import { Spinner } from "@/components/ui/Spinner";
import { EmailAddress } from "@protoxyz/types";
import { useProtocolAuth } from "@/providers/protocol";

export function ManageEmailAddresses() {
    const { user, client, theme, instance } = useProtocolAuth();
    const [emails, setEmails] = useState<EmailAddress[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [addingEmail, setAddingEmail] = useState<boolean>(false);
    const [verifyingEmailId, setVerifyingEmailId] = useState<string | undefined>();
    const [deletingEmailId, setDeletingEmailId] = useState<string | undefined>();
    const [resendingVerificationId, setResendingVerificationId] = useState<string | undefined>();
    const [settingPrimaryId, setSettingPrimaryId] = useState<string | undefined>();

    async function getEmails() {
        const result = await client.auth.emailAddresses.list();

        if (result.status === ResponseStatus.Success) {
            setEmails(result.data);
        } else {
            setError(result.error);
        }
    }

    async function addEmail(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = event.currentTarget.email.value;
        event.currentTarget.reset();
        setError(undefined);
        setAddingEmail(true);
        const result = await client.auth.emailAddresses.create({ body: { email } });
        setAddingEmail(false);

        if (result.status === ResponseStatus.Success) {
            setError(undefined);
            setEmails((emails) => [...emails, result.data.emailAddress]);
        } else {
            setError(result.error);
        }
    }

    async function deleteEmail(emailId: string) {
        setDeletingEmailId(emailId);
        const result = await client.auth.emailAddresses.delete({ path: { emailId } });
        setDeletingEmailId(undefined);

        if (result.status === ResponseStatus.Success) {
            setError(undefined);
            setEmails((emails) => emails.filter((email) => email.id !== emailId));
        } else if (result.status === ResponseStatus.Error) {
            setError(result.error);
        }
    }

    async function verify(event: React.FormEvent<HTMLFormElement>, emailId: string) {
        event.preventDefault();

        const code = event.currentTarget.code.value;
        event.currentTarget.reset();

        setVerifyingEmailId(emailId);
        const result = await client.auth.emailAddresses.verify({ path: { emailId }, body: { code } });
        setVerifyingEmailId(undefined);

        if (result.status === ResponseStatus.Success) {
            setError(undefined);
            setEmails((emails) =>
                emails.map((email) => {
                    if (email.id === emailId) {
                        return result.data.emailAddress;
                    }
                    return email;
                }),
            );
        } else if (result.status === ResponseStatus.Error) {
            setError(result.error);
        }
    }

    async function resendVerification(emailId: string) {
        setResendingVerificationId(emailId);
        const result = await client.auth.emailAddresses.resendVerification({ path: { emailId } });
        setResendingVerificationId(undefined);

        if (result.status === ResponseStatus.Error) {
            setError(result.error);
        }
    }

    async function setPrimary(emailId: string) {
        setSettingPrimaryId(emailId);
        const result = await client.auth.emailAddresses.setPrimary({ path: { emailId } });
        setSettingPrimaryId(undefined);

        if (result.status === ResponseStatus.Success) {
            setError(undefined);
            setEmails((emails) =>
                emails.map((email) => {
                    if (email.id === emailId) {
                        return result.data.emailAddress;
                    }
                    return email;
                }),
            );
        } else if (result.status === ResponseStatus.Error) {
            setError(result.error);
        }
    }

    useEffect(() => {
        getEmails();
    }, []);

    return (
        <div className="md:col-span-3">
            <div className="mt-2 flex flex-col gap-y-2">
                {emails.map((email) => {
                    return (
                        <div key={email.id}>
                            <div
                                className={clsx(
                                    "flex cursor-default items-center justify-between",
                                    theme?.secondaryButtonBgColor,
                                    theme?.secondaryButtonBorder,
                                    theme?.secondaryButtonBorderColor,
                                    theme?.secondaryButtonBorderRadius,
                                    theme?.secondaryButtonBoxShadow,
                                    theme?.secondaryButtonFontSize,
                                    theme?.secondaryButtonFontWeight,
                                    theme?.secondaryButtonPaddingHorizontal,
                                    theme?.secondaryButtonPaddingVertical,
                                    theme?.secondaryButtonTextColor,
                                )}
                            >
                                <div className="flex items-center gap-x-2">
                                    <EnvelopeIcon className={clsx("h-4 w-4 text-black")} />

                                    {email.email}

                                    {email.verifiedAt && (
                                        <>
                                            <div className="h-1 w-1 rounded-full bg-zinc-200" />
                                            <CheckCircleIcon className="h-4 w-4 text-green-400" />
                                        </>
                                    )}

                                    {!email.verifiedAt && (
                                        <>
                                            <div className="h-1 w-1 rounded-full bg-zinc-200" />
                                            <CheckCircleIcon className="h-4 w-4 text-zinc-500" />
                                        </>
                                    )}

                                    {email.id === user?.primaryEmailId && (
                                        <>
                                            <span className="text-sm text-green-400">primary</span>
                                        </>
                                    )}

                                    {email.id !== user?.primaryEmailId &&
                                        (email.verifiedAt || instance?.emailVerificationRequired === false) && (
                                            <>
                                                <Button
                                                    loading={settingPrimaryId === email.id}
                                                    onClick={() => setPrimary(email.id)}
                                                    className={clsx(
                                                        "h-100 px-2 py-1 text-xs",
                                                        theme?.secondaryButtonBgColor,
                                                        theme?.secondaryButtonBorder,
                                                        theme?.secondaryButtonBorderColor,
                                                        theme?.secondaryButtonBorderRadius,
                                                        theme?.secondaryButtonBoxShadow,
                                                        theme?.secondaryButtonFontSize,
                                                        theme?.secondaryButtonFontWeight,
                                                        theme?.secondaryButtonTextColor,
                                                    )}
                                                >
                                                    Set primary
                                                </Button>
                                            </>
                                        )}
                                </div>

                                {
                                    <Button
                                        loading={deletingEmailId === email.id}
                                        onClick={() => deleteEmail(email.id)}
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </Button>
                                }
                            </div>

                            {!email.verifiedAt && (
                                <div className="p-5">
                                    <form onSubmit={(e) => verify(e, email.id)} className="flex gap-x-1">
                                        <VerificationInput placeholder="Enter code" />
                                        <Button
                                            loading={verifyingEmailId === email.id}
                                            type={"submit"}
                                            className={clsx(
                                                "h-100 text-xs",
                                                theme?.secondaryButtonBgColor,
                                                theme?.secondaryButtonBorder,

                                                theme?.secondaryButtonBorderColor,
                                                theme?.secondaryButtonBorderRadius,
                                                theme?.secondaryButtonBoxShadow,
                                                theme?.secondaryButtonFontSize,
                                                theme?.secondaryButtonFontWeight,
                                                theme?.secondaryButtonPaddingHorizontal,
                                                theme?.secondaryButtonPaddingVertical,
                                                theme?.secondaryButtonTextColor,
                                            )}
                                        >
                                            Verify
                                        </Button>
                                    </form>
                                    <div className={clsx("mt-1 text-xs leading-5 text-zinc-600")}>
                                        Enter the verification code we emailed to {email.email}.{" "}
                                        <span
                                            onClick={() => resendVerification(email.id)}
                                            className={clsx("cursor-pointer", theme?.linkTextColor)}
                                        >
                                            {resendingVerificationId === email.id && <Spinner size="xs" />}
                                            {resendingVerificationId !== email.id && "resend"}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {error && (
                    <div className="flex items-start gap-x-2 ">
                        <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                        <span className="text-sm text-red-500">{error}</span>
                    </div>
                )}
            </div>

            <form onSubmit={addEmail} className="mt-2 flex items-center gap-x-1">
                <EmailInput placeholder="Enter an email address" />
                <Button
                    type="submit"
                    loading={addingEmail}
                    className={clsx(
                        "flex items-center gap-x-1",
                        theme?.primaryButtonBgColor,
                        theme?.primaryButtonBorder,
                        theme?.primaryButtonBorderColor,
                        theme?.primaryButtonBorderRadius,
                        theme?.primaryButtonBoxShadow,
                        theme?.primaryButtonFontSize,
                        theme?.primaryButtonFontWeight,
                        theme?.primaryButtonPaddingHorizontal,
                        theme?.primaryButtonPaddingVertical,
                        theme?.primaryButtonTextColor,
                    )}
                >
                    <PlusIcon className="h-4 w-4" />
                    Add
                </Button>
            </form>
        </div>
    );
}
