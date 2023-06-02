import { useProtocolAuth } from "@protoxyz/auth-react";
import { UserSettingsSection } from "../UserSettingsSection";
import clsx from "clsx";

export function AccountTabLogoutOtherSessions({}: {}) {
    const { theme, instance } = useProtocolAuth();

    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3 ">
            <UserSettingsSection
                heading="Log out other sessions"
                subheading="Log out of your other sessions across all of your devices."
            />

            <form className="md:col-span-2">
                {instance?.strategy === "passwords" && (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                        <div className="col-span-full">
                            <label
                                htmlFor="logout-password"
                                className={clsx("block text-sm font-medium leading-6", theme?.labelColor)}
                            >
                                Your password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="logout-password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="focus:ring-secondary-500 block w-full rounded-md border-0 bg-white/5 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex">
                    <button
                        type="submit"
                        className="bg-primary-500 hover:bg-primary-400 focus-visible:outline-primary-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        Log out other sessions
                    </button>
                </div>
            </form>
        </div>
    );
}
