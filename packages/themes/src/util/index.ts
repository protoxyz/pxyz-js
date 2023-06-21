import { AuthAppearance, AuthTheme } from "..";
export type AuthComponentType =
    | "signIn"
    | "signUp"
    | "userButton"
    | "userProfile"
    | "organizationSwitcher"
    | "organizationProfile"
    | "organizationCreate";

function getSignInAppearances({ appearance }: { appearance: AuthAppearance | undefined }) {
    return {
        cardWrapper: appearance?.signIn?.elements?.cardWrapper ?? appearance?.elements?.cardWrapper,
        card: appearance?.signIn?.elements?.card ?? appearance?.elements?.card,
        cardHeader: appearance?.signIn?.elements?.cardHeader ?? appearance?.elements?.cardHeader,
        cardHeaderTitle: appearance?.signIn?.elements?.cardHeaderTitle ?? appearance?.elements?.cardHeaderTitle,
        cardHeaderDescription:
            appearance?.signIn?.elements?.cardHeaderDescription ?? appearance?.elements?.cardHeaderDescription,
        cardContent: appearance?.signIn?.elements?.cardContent ?? appearance?.elements?.cardContent,
        cardFooter: appearance?.signIn?.elements?.cardFooter ?? appearance?.elements?.cardFooter,
    };
}

export function getMergedTheme({
    appearance,
    component,
}: {
    appearance: AuthAppearance;
    component: AuthComponentType;
}): AuthTheme {
    const theme: AuthTheme = {
        variables: {
            ...appearance?.variables,
            ...appearance?.[component]?.variables,
        },
        layout: {
            ...appearance?.layout,
            ...appearance?.[component]?.layout,
        },
        elements: {
            ...appearance?.elements,
            ...appearance?.[component]?.elements,
            ...getSignInAppearances({ appearance }),
        },
    };

    return theme;
}

// export function mergeAuthTheme({ appearance }: { appearance: AuthAppearance }): AuthTheme {
//     const variables = mergeAuthThemeVariables({ base: appearance.base, override: appearance. });
//     const layout = mergeAuthThemeLayout({ base, override });

//     const theme: AuthTheme = {
//         variables,
//         layout,
//         elements: {
//             ...getSignInAppearances({ appearance }),
//         },
//     };

//     return theme;
// }

// export function mergeAuthThemeVariables({ base, override }: { base: AuthTheme | undefined; override: AuthTheme | undefined }) {
//     const variables = {
//         ...base?.variables,
//         ...override?.variables,
//     };

//     return variables;
// }

// export function mergeAuthThemeLayout({ base, override }: { base: AuthTheme | undefined; override: AuthTheme | undefined }) {
//     const layout = {
//         ...base?.layout,
//         ...override?.layout,
//     };

//     return layout;
// }
