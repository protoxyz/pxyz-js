import clsx from "clsx";
import { useProtocolAuth } from "@/providers/protocol";

export interface UserSettingsNavigationItem {
    label: string;
    tab: string;
    content: React.ReactNode;
}

export function UserSettingsTabNavigation({
    setCurrentTab,
    navigation,
}: {
    setCurrentTab: (tab: string) => void;
    navigation: { name: string; tab: string; current: boolean }[];
}) {
    const { theme } = useProtocolAuth();

    return (
        <header className={clsx("w-full", theme?.userSettingsNavBorder, theme?.userSettingsNavBorderColor)}>
            <nav className="flex overflow-x-auto py-4">
                <ul
                    role="list"
                    className="flex min-w-full flex-none gap-x-6  text-sm font-semibold leading-6 text-zinc-400 "
                >
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <button
                                className={item.current ? "text-primary-500" : ""}
                                onClick={() => setCurrentTab(item.tab)}
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
