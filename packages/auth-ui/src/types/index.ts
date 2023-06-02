export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

export enum ThemeHeaderAlignment {
    left = "left",
    center = "center",
    right = "right",
}

export enum ThemeHeaderPlacement {
    inside = "inside",
    outside = "outside",
    none = "none",
}

export enum ThemeLayout {
    card = "card",
    simple = "simple",
    split = "split",
}

export enum ThemeSocialPlacement {
    top = "top",
    bottom = "bottom",
    none = "none",
}

export enum ThemeSocialType {
    button = "button",
    icon = "icon",
}

export interface InputFieldProps {
    inline?: boolean | null | undefined;
    hideLabel?: boolean | null | undefined;
    labelColor?: string | null | undefined;
    labelRequiredColor?: string | null | undefined;
    placeholder?: string | null | undefined;
    backgroundColor?: string | null | undefined;
    borderColor?: string | null | undefined;
    borderWidth?: number | null | undefined;
    borderStyle?: string | null | undefined;
    textColor?: string | null | undefined;
    size?: Size | null | undefined;
    borderRadius?: number | null | undefined;
    padding?: number | null | undefined;
    paddingHorizontal?: number | null | undefined;
    paddingVertical?: number | null | undefined;
    boxShadow?: string | null | undefined;
}

export interface InputProps {
    placeholder: string;
    required?: boolean;
}

export interface Localization {
    [key: string]: string;
    signIn_title: string;
    signIn_subtitle: string;
    signIn_label_email: string;
    signIn_label_password: string;
    signIn_label_phone: string;
    signIn_link_forgotPassword: string;
    signIn_submit_text: string;
    signIn_divider_text: string;
    signIn_social_text: string;
    signIn_link_dontHaveAnAccount: string;

    signUp_title: string;
    signUp_subtitle: string;
    signUp_label_email: string;
    signUp_label_password: string;
    signUp_label_phone: string;
    signUp_label_firstName: string;
    signUp_label_lastName: string;
    signUp_submit_text: string;
    signUp_divider_text: string;
    signUp_link_haveAnAccount: string;
}
