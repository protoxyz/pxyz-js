import { CheckCircleIcon, ExclamationCircleIcon, PhoneIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ResponseStatus } from "@protoxyz/core";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/inputs/Button";
import { PhoneInput } from "@/components/ui/inputs/PhoneInput";
import { VerificationInput } from "@/components/ui/inputs/VerificationCodeInput";
import { Spinner } from "@/components/ui/Spinner";
import { PhoneNumber } from "@protoxyz/types";
import { useProtocolAuth } from "@/providers/protocol";

export function ManagePhoneNumbers() {
    const { user, client, theme, instance } = useProtocolAuth();
    const [phones, setPhones] = useState<PhoneNumber[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [addingPhone, setAddingPhone] = useState<boolean>(false);
    const [verifyingPhoneId, setVerifyingPhoneId] = useState<string | undefined>();
    const [deletingPhoneId, setDeletingPhoneId] = useState<string | undefined>();
    const [resendingVerificationId, setResendingVerificationId] = useState<string | undefined>();
    const [settingPrimaryId, setSettingPrimaryId] = useState<string | undefined>();

    async function getPhones() {
        const result = await client.auth.phoneNumbers.list();

        if (result.status === ResponseStatus.Success) {
            setPhones(result.data);
        } else {
            setError(result.error);
        }
    }

    async function addPhone(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const phone = event.currentTarget.phone.value;
        event.currentTarget.reset();
        setError(undefined);
        setAddingPhone(true);
        const result = await client.auth.phoneNumbers.create({ body: { phone } });
        setAddingPhone(false);

        if (result.status === ResponseStatus.Success) {
            setError(undefined);
            setPhones((phones) => [...phones, result.data.phoneNumber]);
        } else {
            setError(result.error);
        }
    }

    async function deletePhone(phoneId: string) {
        setDeletingPhoneId(phoneId);
        const result = await client.auth.phoneNumbers.delete({ path: { phoneId } });
        setDeletingPhoneId(undefined);

        if (result.status === ResponseStatus.Success) {
            setError(undefined);
            setPhones((phones) => phones.filter((phone) => phone.id !== phoneId));
        } else if (result.status === ResponseStatus.Error) {
            setError(result.error);
        }
    }

    async function verify(event: React.FormEvent<HTMLFormElement>, phoneId: string) {
        event.preventDefault();

        const code = event.currentTarget.code.value;
        event.currentTarget.reset();

        setVerifyingPhoneId(phoneId);
        const result = await client.auth.phoneNumbers.verify({ path: { phoneId }, body: { code } });
        setVerifyingPhoneId(undefined);

        if (result.status === ResponseStatus.Success) {
            setError(undefined);
            setPhones((phones) =>
                phones.map((phone) => {
                    if (phone.id === phoneId) {
                        return result.data.phoneNumber;
                    }
                    return phone;
                }),
            );
        } else if (result.status === ResponseStatus.Error) {
            setError(result.error);
        }
    }

    async function resendVerification(phoneId: string) {
        setResendingVerificationId(phoneId);
        const result = await client.auth.phoneNumbers.resendVerification({ path: { phoneId } });
        setResendingVerificationId(undefined);

        if (result.status === ResponseStatus.Error) {
            setError(result.error);
        }
    }

    async function setPrimary(phoneId: string) {
        setSettingPrimaryId(phoneId);
        const result = await client.auth.phoneNumbers.setPrimary({ path: { phoneId } });
        setSettingPrimaryId(undefined);

        if (result.status === ResponseStatus.Success) {
            setError(undefined);
            setPhones((phones) =>
                phones.map((phone) => {
                    if (phone.id === phoneId) {
                        return result.data.phoneNumber;
                    }
                    return phone;
                }),
            );
        } else if (result.status === ResponseStatus.Error) {
            setError(result.error);
        }
    }

    useEffect(() => {
        getPhones();
    }, []);

    return (
        <div className="md:col-span-3">
            <div className="mt-2 flex flex-col gap-y-2">
                {phones.map((phone) => {
                    return (
                        <div key={phone.id}>
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
                                    <PhoneIcon className={clsx("h-4 w-4 text-black")} />

                                    {phone.phone}

                                    {phone.verifiedAt && (
                                        <>
                                            <div className="h-1 w-1 rounded-full bg-zinc-200" />
                                            <CheckCircleIcon className="h-4 w-4 text-green-400" />
                                        </>
                                    )}

                                    {!phone.verifiedAt && (
                                        <>
                                            <div className="h-1 w-1 rounded-full bg-zinc-200" />
                                            <CheckCircleIcon className="h-4 w-4 text-zinc-500" />
                                        </>
                                    )}

                                    {phone.id === user?.primaryPhoneId && (
                                        <>
                                            <span className="text-sm text-green-400">primary</span>
                                        </>
                                    )}

                                    {phone.id !== user?.primaryPhoneId &&
                                        (phone.verifiedAt || instance?.phoneVerificationRequired === false) && (
                                            <>
                                                <Button
                                                    loading={settingPrimaryId === phone.id}
                                                    onClick={() => setPrimary(phone.id)}
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
                                        loading={deletingPhoneId === phone.id}
                                        onClick={() => deletePhone(phone.id)}
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </Button>
                                }
                            </div>

                            {!phone.verifiedAt && (
                                <div className="p-5">
                                    <form onSubmit={(e) => verify(e, phone.id)} className="flex gap-x-1">
                                        <VerificationInput placeholder="Enter code" />
                                        <Button
                                            loading={verifyingPhoneId === phone.id}
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
                                        Enter the verification code we texted to {phone.phone}.{" "}
                                        <span
                                            onClick={() => resendVerification(phone.id)}
                                            className={clsx("cursor-pointer", theme?.linkTextColor)}
                                        >
                                            {resendingVerificationId === phone.id && <Spinner size="xs" />}
                                            {resendingVerificationId !== phone.id && "resend"}
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

            <form onSubmit={addPhone} className="mt-2 flex items-center gap-x-1">
                <PhoneInput placeholder="Enter a phone number" />

                <Button
                    type="submit"
                    loading={addingPhone}
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
