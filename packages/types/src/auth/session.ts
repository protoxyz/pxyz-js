import { SignInAttempt } from './sign-in-attempt';
import { SignUpAttempt } from './sign-up-attempt';
import { UserProfile } from './user-profile';

export interface Session {
  id: string;
  browser: string | null | undefined;
  device: string | null | undefined;
  engine: string | null | undefined;
  os: string | null | undefined;
  cpu: string | null | undefined;
  ua: string | null | undefined;
  ip: string | null | undefined;
  userId: string;
  user?: UserProfile;

  signInAttemptId: string | null | undefined;
  signInAttempt?: SignInAttempt;
  signUpAttemptId: string | null | undefined;
  signUpAttempt?: SignUpAttempt;

  expiresAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
