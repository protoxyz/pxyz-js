export const AuthSocialConnectionStatus = {
    created: "created",
    active: "active",
    disconnected: "disconnected",
};
export type AuthSocialConnectionStatus = (typeof AuthSocialConnectionStatus)[keyof typeof AuthSocialConnectionStatus];
