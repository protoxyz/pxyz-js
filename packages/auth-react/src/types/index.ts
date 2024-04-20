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
  signUp_label_name: string;
  signUp_submit_text: string;
  signUp_divider_text: string;
  signUp_link_haveAnAccount: string;
}
