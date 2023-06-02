import { useProtocolAuth } from "@protoxyz/auth-react";
import clsx from "clsx";
import { useState } from "react";
import { NativeSelectTimezone } from "../../../inputs/Timezone";
import { Button } from "../../../inputs";

export function ManageUserDetails({}: {}) {
    const { theme, user, isUpdatingUser, updateUser, instance } = useProtocolAuth();
    const [timezone, setTimezone] = useState<string>(
        user?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    );

    const onSubmit = (e: any) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const firstName = form.get("firstName")?.toString();
        const lastName = form.get("lastName")?.toString();
        const username = form.get("username")?.toString();

        updateUser({ firstName, lastName, username, timezone });
    };

    return (
        <form onSubmit={onSubmit} className="md:col-span-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full flex items-center gap-x-8">
                    {user?.imageUri && (
                        <img
                            src={user?.imageUri}
                            alt=""
                            className="h-24 w-24 flex-none rounded-lg bg-zinc-800 object-cover"
                        />
                    )}
                    <div>
                        <button
                            type="button"
                            className={clsx(
                                theme?.secondaryButtonBorderRadius,
                                theme?.secondaryButtonBgColor,
                                theme?.secondaryButtonPaddingHorizontal,
                                theme?.secondaryButtonPaddingVertical,
                                theme?.secondaryButtonTextColor,
                                theme?.secondaryButtonBoxShadow,
                                "text-sm font-semibold ",
                            )}
                        >
                            Change avatar
                        </button>
                        <p className="mt-2 text-xs leading-5 text-zinc-400">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </div>

                {instance?.identifierName && (
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="firstName"
                            className={clsx("block text-sm font-medium leading-6", theme?.labelColor)}
                        >
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autoComplete="given-name"
                                defaultValue={user?.firstName ?? ""}
                                className={clsx(
                                    theme?.inputBorderRadius,
                                    theme?.inputBgColor,
                                    theme?.inputPaddingHorizontal,
                                    theme?.inputPaddingVertical,
                                    theme?.inputText,
                                    theme?.inputBoxShadow,
                                    theme?.inputBorder,
                                    theme?.inputBorderColor,
                                    "focus:ring-secondary-500 block w-full border-0 ring-inset focus:ring-inset sm:text-sm sm:leading-6",
                                )}
                            />
                        </div>
                    </div>
                )}

                {instance?.identifierName && (
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="lastName"
                            className={clsx("block text-sm font-medium leading-6", theme?.labelColor)}
                        >
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autoComplete="family-name"
                                defaultValue={user?.lastName ?? ""}
                                className={clsx(
                                    theme?.inputBorderRadius,
                                    theme?.inputBgColor,
                                    theme?.inputPaddingHorizontal,
                                    theme?.inputPaddingVertical,
                                    theme?.inputText,
                                    theme?.inputBoxShadow,
                                    theme?.inputBorder,
                                    theme?.inputBorderColor,
                                    "focus:ring-secondary-500 block w-full border-0 ring-inset focus:ring-inset sm:text-sm sm:leading-6",
                                )}
                            />
                        </div>
                    </div>
                )}

                {instance?.identifierUsername && (
                    <div className="col-span-full">
                        <label
                            htmlFor="username"
                            className={clsx("block text-sm font-medium leading-6", theme?.labelColor)}
                        >
                            Username
                        </label>
                        <div className="mt-2">
                            <div className="focus-within:ring-secondary-500 flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset">
                                <span className="flex select-none items-center pl-3 text-zinc-400 sm:text-sm">
                                    example.com/
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    defaultValue={user?.username ?? ""}
                                    className={clsx(
                                        theme?.inputBorderRadius,
                                        theme?.inputBgColor,
                                        theme?.inputPaddingHorizontal,
                                        theme?.inputPaddingVertical,
                                        theme?.inputText,
                                        theme?.inputBoxShadow,
                                        theme?.inputBorder,
                                        theme?.inputBorderColor,
                                        "focus:ring-secondary-500 block w-full border-0 ring-inset focus:ring-inset sm:text-sm sm:leading-6",
                                    )}
                                    placeholder="janesmith"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-span-full">
                    <label
                        htmlFor="timezone"
                        className={clsx("block text-sm font-medium leading-6", theme?.labelColor)}
                    >
                        Timezone
                    </label>
                    <div className="mt-2">
                        <NativeSelectTimezone
                            value={timezone}
                            onChange={(tz) => setTimezone(tz.value)}
                            selectOptions={{}}
                            className={clsx(
                                theme?.inputBorderRadius,
                                theme?.inputBgColor,
                                theme?.inputPaddingHorizontal,
                                theme?.inputPaddingVertical,
                                theme?.inputText,
                                theme?.inputBoxShadow,
                                theme?.inputBorder,
                                theme?.inputBorderColor,
                                "focus:ring-secondary-500 block w-full border-0 ring-inset focus:ring-inset sm:text-sm sm:leading-6",
                            )}
                        />
                    </div>
                </div>

                <div className="col-span-full mt-8">
                    <Button
                        type="submit"
                        loading={isUpdatingUser}
                        className={clsx(
                            "w-full",
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
                        Save Updates
                    </Button>
                </div>
            </div>
        </form>
    );
}
