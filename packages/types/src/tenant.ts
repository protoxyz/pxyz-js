import { Environment, SocialProvider } from '.';
import { AuthProperties } from './auth/auth-properties';
import { Domain } from './domain';

export interface Brand {
  background: string | null;
  foreground: string | null;
  muted: string | null;
  mutedForeground: string | null;
  popover: string | null;
  popoverForeground: string | null;
  card: string | null;
  cardForeground: string | null;
  border: string | null;
  input: string | null;
  primary: string | null;
  primaryForeground: string | null;
  secondary: string | null;
  secondaryForeground: string | null;
  accent: string | null;
  accentForeground: string | null;
  destructive: string | null;
  destructiveForeground: string | null;
  ring: string | null;
  radius: string | null;

  // dark
  darkBackground: string | null;
  darkForeground: string | null;

  darkMuted: string | null;
  darkMutedForeground: string | null;

  darkPopover: string | null;
  darkPopoverForeground: string | null;

  darkCard: string | null;
  darkCardForeground: string | null;

  darkBorder: string | null;
  darkInput: string | null;

  darkPrimary: string | null;
  darkPrimaryForeground: string | null;

  darkSecondary: string | null;
  darkSecondaryForeground: string | null;

  darkAccent: string | null;
  darkAccentForeground: string | null;

  darkDestructive: string | null;
  darkDestructiveForeground: string | null;

  darkRing: string | null;
  darkRadius: string | null;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logoId: string | null;
  logoUri: string | null;
  iconId: string | null;
  iconUri: string | null;
  environment: Environment;
  publicKey: string;
  creatorId: string;

  auth: AuthProperties;
  brand: Brand | null;

  socialProviders?: SocialProvider[];
  domains?: Domain[];

  createdAt: Date | string;
  updatedAt: Date | string;
}
