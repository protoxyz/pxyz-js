import { AuthVerificationStrategy } from '..';

export type AllowedFirstFactorStrategy =
  | AuthVerificationStrategy.username_password
  | AuthVerificationStrategy.email_password
  | AuthVerificationStrategy.phone_password
  | AuthVerificationStrategy.email_link
  | AuthVerificationStrategy.email_code
  | AuthVerificationStrategy.phone_code
  | AuthVerificationStrategy.oauth;
