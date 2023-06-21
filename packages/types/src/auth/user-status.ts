export const AuthUserStatus = {
    active: "active",
    inactive: "inactive",
    suspended: "suspended",
};
export type AuthUserStatus = (typeof AuthUserStatus)[keyof typeof AuthUserStatus];
