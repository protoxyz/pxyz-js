import { useProtocolAuth } from "@protoxyz/auth-react";
import clsx from "clsx";
import { Button } from "../../../inputs";
import { UserSettingsSection } from "../UserSettingsSection";

export function AccountTabChangePassword() {
    const { theme, instance } = useProtocolAuth();

    if (instance?.strategy !== "passwords") return null;

    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3 ">
            <UserSettingsSection
                heading="Change password"
                subheading="Update your password associated with your account."
            />

            <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                        <label
                            htmlFor="current-password"
                            className={clsx("block text-sm font-medium leading-6", theme?.labelColor)}
                        >
                            Current password
                        </label>
                        <div className="mt-2">
                            <input
                                id="current-password"
                                name="current_password"
                                type="password"
                                autoComplete="current-password"
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

                    <div className="col-span-full">
                        <label
                            htmlFor="new-password"
                            className={clsx("block text-sm font-medium leading-6", theme?.labelColor)}
                        >
                            New password
                        </label>
                        <div className="mt-2">
                            <input
                                id="new-password"
                                name="new_password"
                                type="password"
                                autoComplete="new-password"
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

                    <div className="col-span-full">
                        <label
                            htmlFor="confirm-password"
                            className={clsx("block text-sm font-medium leading-6", theme?.labelColor)}
                        >
                            Confirm password
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirm-password"
                                name="confirm_password"
                                type="password"
                                autoComplete="new-password"
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
                </div>

                <div className="mt-8 flex">
                    <Button
                        type="submit"
                        className={clsx(
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
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}
