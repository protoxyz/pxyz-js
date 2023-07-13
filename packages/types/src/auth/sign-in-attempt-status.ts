export const AuthSignInAttemptStatus = {
  needs_identifier: 'needs_identifier',
  needs_factor_one: 'needs_factor_one',
  needs_factor_two: 'needs_factor_two',
  complete: 'complete',
};
export type AuthSignInAttemptStatus =
  (typeof AuthSignInAttemptStatus)[keyof typeof AuthSignInAttemptStatus];
