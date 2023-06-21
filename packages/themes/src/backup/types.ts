// export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

// export type Layout = {};

// // export const ThemeHeaderAlignment = {
// //     left: "left",
// //     center: "center",
// //     right: "right",
// // };
// // export type ThemeHeaderAlignment = (typeof ThemeHeaderAlignment)[keyof typeof ThemeHeaderAlignment];

// // export const ThemeHeaderPlacement = {
// //     inside: "inside",
// //     outside: "outside",
// //     none: "none",
// // };
// // export type ThemeHeaderPlacement = (typeof ThemeHeaderPlacement)[keyof typeof ThemeHeaderPlacement];

// // export const ThemeSocialPlacement = {
// //     top: "top",
// //     bottom: "bottom",
// //     none: "none",
// // };
// // export type ThemeSocialPlacement = (typeof ThemeSocialPlacement)[keyof typeof ThemeSocialPlacement];

// // export const ThemeSocialType = {
// //     button: "button",
// //     icon: "icon",
// // };
// // export type ThemeSocialType = (typeof ThemeSocialType)[keyof typeof ThemeSocialType];

// // export const ThemeDefaultType = {
// //     light: "light",
// //     dark: "dark",
// //     base: "base",
// // };
// // export type ThemeDefaultType = (typeof ThemeDefaultType)[keyof typeof ThemeDefaultType];

// // export interface Theme {
// //     id: string;
// //     projectId: string;
// //     baseType: ThemeDefaultType;
// //     properties: Partial<ThemeProperties>;
// //     createdAt: Date | string;
// //     updatedAt: Date | string;
// // }

// // export interface ThemeProperties {
// //     // Page
// //     backgroundColor: string;
// //     backgroundImage: string | null | undefined;

// //     // Brand
// //     brandLogo: string | null | undefined;
// //     brandName: string;

// //     // Primary
// //     primaryColor: string;

// //     linkTextColor: string;

// //     // Divider
// //     dividerTextBgColor: string;
// //     dividerColor: string;
// //     dividerTextColor: string;

// //     // Heading
// //     headingColor: string;
// //     headingFontSize: string;
// //     headingFontWeight: string;

// //     // Subheading
// //     subheadingColor: string;
// //     subheadingFontSize: string;
// //     subheadingFontWeight: string;

// //     // Header
// //     headerBgColor: string;
// //     headerBrandNameColor: string;
// //     headerBrandLogoFill: string;
// //     headerBoxShadow: string;

// //     // UserSettings
// //     userSettingsBgColor: string;
// //     userSettingsBorderColor: string;
// //     userSettingsBoxShadow: string;
// //     userSettingsBorderRadius: string;

// //     userSettingsNavBorderColor: string;
// //     userSettingsNavBorder: string;
// //     userSettingsTabBgColor: string;
// //     userSettingsTabTextColor: string;

// //     userSettingsHeadingColor: string;
// //     userSettingsSubheadingColor: string;

// //     // Landing
// //     landingHeadingColor?: string;
// //     landingHeadingFontSize?: string;
// //     landingHeadingFontWeight?: string;

// //     landingSubheadingColor?: string;
// //     landingSubheadingFontSize?: string;
// //     landingSubheadingFontWeight?: string;

// //     // UserDropdown
// //     userDropdownBgColor: string;
// //     userDropdownTextColor: string;
// //     userDropdownBorderColor: string;
// //     userDropdownMenuBgColor: string;
// //     userDropdownMenuTextColor: string;
// //     userDropdownMenuBorderColor: string;
// //     userDropdownMenuShadow: string;
// //     userDropdownMenuDividerColor: string;

// //     // Input
// //     inputText: string;
// //     inputBgColor: string;
// //     inputBorderColor: string;
// //     inputBorder: string;
// //     inputBorderRadius: string;
// //     inputBoxShadow: string;
// //     inputPaddingHorizontal: string;
// //     inputPaddingVertical: string;

// //     // Label
// //     labelColor: string;
// //     labelFontSize: string;
// //     labelFontWeight: string;

// //     // Cards
// //     cardBgColor: string;
// //     cardBorderColor: string;
// //     cardBorder: string;
// //     cardBorderRadius: string;
// //     cardBoxShadow: string;
// //     cardPaddingHorizontal: string;
// //     cardPaddingVertical: string;
// //     cardHeadingColor: string;
// //     cardSubheadingColor: string;

// //     landingCardBgColor?: string;
// //     landingCardBorderColor?: string;
// //     landingCardBorder?: string;
// //     landingCardBorderRadius?: string;
// //     landingCardBoxShadow?: string;
// //     landingCardPaddingHorizontal?: string;
// //     landingCardPaddingVertical?: string;
// //     landingCardHeadingColor?: string;
// //     landingCardSubheadingColor?: string;

// //     signInCardBgColor?: string;
// //     signInCardBorderColor?: string;
// //     signInCardBorder?: string;
// //     signInCardBorderRadius?: string;
// //     signInCardBoxShadow?: string;
// //     signInCardPaddingHorizontal?: string;
// //     signInCardPaddingVertical?: string;
// //     signInCardHeadingColor?: string;
// //     signInCardSubheadingColor?: string;

// //     signUpCardBgColor?: string;
// //     signUpCardBorderColor?: string;
// //     signUpCardBorder?: string;
// //     signUpCardBorderRadius?: string;
// //     signUpCardBoxShadow?: string;
// //     signUpCardPaddingHorizontal?: string;
// //     signUpCardPaddingVertical?: string;
// //     signUpCardHeadingColor?: string;
// //     signUpCardSubheadingColor?: string;

// //     // Buttons
// //     primaryButtonFontSize: string;
// //     primaryButtonFontWeight: string;
// //     primaryButtonBgColor: string;
// //     primaryButtonTextColor: string;
// //     primaryButtonBorderColor: string;
// //     primaryButtonBorder: string;
// //     primaryButtonBorderRadius: string;
// //     primaryButtonBoxShadow: string;
// //     primaryButtonPaddingHorizontal: string;
// //     primaryButtonPaddingVertical: string;

// //     secondaryButtonFontSize: string;
// //     secondaryButtonFontWeight: string;
// //     secondaryButtonBgColor: string;
// //     secondaryButtonTextColor: string;
// //     secondaryButtonBorderColor: string;
// //     secondaryButtonBorder: string;
// //     secondaryButtonBorderRadius: string;
// //     secondaryButtonBoxShadow: string;
// //     secondaryButtonPaddingHorizontal: string;
// //     secondaryButtonPaddingVertical: string;

// //     socialButtonBgColor: string;
// //     socialButtonBorder: string;
// //     socialButtonBorderColor: string;
// //     socialButtonBorderRadius: string;
// //     socialButtonBoxShadow: string;
// //     socialButtonPaddingHorizontal: string;
// //     socialButtonPaddingVertical: string;
// //     socialButtonIconFill: string;
// //     socialButtonIconWidth: string;
// //     socialButtonIconHeight: string;
// //     socialButtonTextColor: string;
// //     socialButtonFontSize: string;
// //     socialButtonFontWeight: string;

// //     // Secured by
// //     securedByProtocolBgColor: string;
// //     securedByProtocolTextColor: string;
// //     securedByProtocolProtocolColor: string;

// //     // Actions
// //     signInActionsLinkColor: string;
// //     signInActionsLinkSize: string;
// //     signInActionsLinkWeight: string;
// //     signUpActionsLinkColor: string;
// //     signUpActionsLinkSize: string;
// //     signUpActionsLinkWeight: string;

// //     // Sign Up
// //     signUpSubmitText: string;
// //     signInSubmitText: string;
// //     verifyText: string;
// // }
