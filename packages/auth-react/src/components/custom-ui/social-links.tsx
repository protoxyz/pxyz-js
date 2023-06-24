import { AuthAppearance } from "@protoxyz/themes";
import { AuthInstance } from "@protoxyz/types";
import { IconButton } from "./icon-button";
import CompanyIcons from "../icons/companies";

export function SocialLinks({ instance }: { appearance: AuthAppearance; instance: AuthInstance }) {
    const filteredProviders = instance?.socialProviders?.filter((p) => p.enabled) ?? [];
    let gridCols = "";

    switch (filteredProviders.length) {
        case 1:
            gridCols = "grid-cols-1";
            break;
        case 2:
            gridCols = "grid-cols-2";
            break;
        default:
            gridCols = "grid-cols-3";
            break;
    }

    if (filteredProviders.length === 0) {
        return null;
    }

    return (
        <div className={`grid ${gridCols} gap-x-6 gap-y-3`}>
            {filteredProviders?.map((provider) => (
                <IconButton
                    key={provider.providerKey}
                    icon={CompanyIcons[provider.providerKey]}
                    text={`Continue with ${provider.providerKey}`}
                />
            ))}
        </div>
    );
}
