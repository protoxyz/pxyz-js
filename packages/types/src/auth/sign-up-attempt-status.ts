export const AuthSignUpAttemptStatus = {
    missing_requirements: "missing_requirements",
    needs_verification: "needs_verification",
    complete: "complete",
    abandoned: "abandoned",
};
export type AuthSignUpAttemptStatus = (typeof AuthSignUpAttemptStatus)[keyof typeof AuthSignUpAttemptStatus];
