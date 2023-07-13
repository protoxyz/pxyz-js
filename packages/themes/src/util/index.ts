import { BaseAppearance } from '@/appearances/auth/base';
import { AuthAppearance } from '..';
export type AuthComponentType =
  | 'signIn'
  | 'signUp'
  | 'userButton'
  | 'userProfile'
  | 'organizationSwitcher'
  | 'organizationProfile'
  | 'createOrganization';

function getSignInAppearances({
  appearance,
}: {
  appearance: AuthAppearance | undefined;
}) {
  return {
    cardWrapper:
      appearance?.signIn?.elements?.cardWrapper ??
      appearance?.elements?.cardWrapper,
    card: appearance?.signIn?.elements?.card ?? appearance?.elements?.card,
    cardHeader:
      appearance?.signIn?.elements?.cardHeader ??
      appearance?.elements?.cardHeader,
    cardHeaderTitle:
      appearance?.signIn?.elements?.cardHeaderTitle ??
      appearance?.elements?.cardHeaderTitle,
    cardHeaderDescription:
      appearance?.signIn?.elements?.cardHeaderDescription ??
      appearance?.elements?.cardHeaderDescription,
    cardContent:
      appearance?.signIn?.elements?.cardContent ??
      appearance?.elements?.cardContent,
    cardFooter:
      appearance?.signIn?.elements?.cardFooter ??
      appearance?.elements?.cardFooter,
  };
}

function deepMerge(target: any, source: any) {
  let src = source ?? {};
  let tgt = target ?? {};

  for (const key of Object.keys(src)) {
    if (src[key] instanceof Object) {
      Object.assign(src[key], deepMerge(tgt[key], src[key]));
    }
  }

  Object.assign(tgt || {}, src);
  return tgt;
}

export function mergeAppearance({
  appearance,
}: {
  appearance: AuthAppearance | undefined;
}) {
  const mergedTheme: AuthAppearance = {
    layout: {
      ...(appearance?.base?.layout || BaseAppearance?.layout),
      ...appearance?.layout,
    },

    variables: {
      ...(appearance?.base?.variables || BaseAppearance?.variables),
      ...appearance?.variables,
    },

    elements: {
      card: deepMerge(
        appearance?.base?.elements?.card || BaseAppearance?.elements?.card,
        appearance?.elements?.card,
      ),
      cardWrapper: deepMerge(
        appearance?.base?.elements?.cardWrapper ||
          BaseAppearance?.elements?.cardWrapper,
        appearance?.elements?.cardWrapper,
      ),
      cardHeader: deepMerge(
        appearance?.base?.elements?.cardHeader ||
          BaseAppearance?.elements?.cardHeader,
        appearance?.elements?.cardHeader,
      ),
      cardHeaderTitle: deepMerge(
        appearance?.base?.elements?.cardHeaderTitle ||
          BaseAppearance?.elements?.cardHeaderTitle,
        appearance?.elements?.cardHeaderTitle,
      ),
      cardHeaderDescription: deepMerge(
        appearance?.base?.elements?.cardHeaderDescription ||
          BaseAppearance?.elements?.cardHeaderDescription,
        appearance?.elements?.cardHeaderDescription,
      ),
      cardContent: deepMerge(
        appearance?.base?.elements?.cardContent ||
          BaseAppearance?.elements?.cardContent,
        appearance?.elements?.cardContent,
      ),
      cardFooter: deepMerge(
        appearance?.base?.elements?.cardFooter ||
          BaseAppearance?.elements?.cardFooter,
        appearance?.elements?.cardFooter,
      ),
      ...appearance?.elements,
    },

    signIn: deepMerge(
      appearance?.base?.signIn || BaseAppearance?.signIn,
      appearance?.signIn,
    ),
    signUp: deepMerge(
      appearance?.base?.signUp || BaseAppearance?.signUp,
      appearance?.signUp,
    ),
    userButton: deepMerge(
      appearance?.base?.userButton || BaseAppearance?.userButton,
      appearance?.userButton,
    ),
    userProfile: deepMerge(
      appearance?.base?.userProfile || BaseAppearance?.userProfile,
      appearance?.userProfile,
    ),
    organizationSwitcher: deepMerge(
      appearance?.base?.organizationSwitcher ||
        BaseAppearance?.organizationSwitcher,
      appearance?.organizationSwitcher,
    ),
    organizationProfile: deepMerge(
      appearance?.base?.organizationProfile ||
        BaseAppearance?.organizationProfile,
      appearance?.organizationProfile,
    ),
    organizationCreate: deepMerge(
      appearance?.base?.organizationCreate ||
        BaseAppearance?.organizationCreate,
      appearance?.organizationCreate,
    ),
  };

  return mergedTheme;
}

// export function getMergedTheme({
//     appearance,
//     component,
// }: {
//     appearance: AuthAppearance;
//     component: AuthComponentType;
// }): AuthTheme {
//     const theme: AuthTheme = {
//         variables: {
//             ...appearance?.variables,
//             ...appearance?.[component]?.variables,
//         },
//         layout: {
//             ...appearance?.layout,
//             ...appearance?.[component]?.layout,
//         },
//         elements: {
//             ...appearance?.elements,
//             ...appearance?.[component]?.elements,
//             ...getSignInAppearances({ appearance }),
//         },
//     };

//     return theme;
// }

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
