export const AuthVerificationStrategy = {
  email_link: 'email_link',
  email_code: 'email_code',
  phone_code: 'phone_code',
  password: 'password',
  oauth: 'oauth',
  authenticator_code: 'authenticator_code',
  security_key: 'security_key',
};
export type AuthVerificationStrategy =
  (typeof AuthVerificationStrategy)[keyof typeof AuthVerificationStrategy];
