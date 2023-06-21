export const AuthenticationStrategy = {
    passwords: "passwords",
    passwordless: "passwordless",
};
export type AuthenticationStrategy = (typeof AuthenticationStrategy)[keyof typeof AuthenticationStrategy];
