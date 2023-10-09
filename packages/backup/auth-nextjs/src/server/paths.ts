interface URLProps {
  base?: string;
}

export function getSignInUrl({ base }: URLProps) {
  const path = process.env.NEXT_PUBLIC_PXYZ_SIGN_IN_URL ?? '/sign-in';

  if (base) {
    return new URL(path, base);
  }

  return path;
}

export function getSignOutUrl({ base }: URLProps) {
  const path = process.env.NEXT_PUBLIC_PXYZ_SIGN_OUT_URL ?? '/sign-out';

  if (base) {
    return new URL(path, base);
  }

  return path;
}

export function getSignUpUrl({ base }: URLProps) {
  const path = process.env.NEXT_PUBLIC_PXYZ_SIGN_UP_URL ?? '/sign-up';

  if (base) {
    return new URL(path, base);
  }

  return path;
}

export function getForgotPasswordUrl({ base }: URLProps) {
  const path =
    process.env.NEXT_PUBLIC_PXYZ_FORGOT_PASSWORD_URL ?? '/forgot-password';

  if (base) {
    return new URL(path, base);
  }

  return path;
}

export function getResetPasswordUrl({ base }: URLProps) {
  const path =
    process.env.NEXT_PUBLIC_PXYZ_RESET_PASSWORD_URL ?? '/reset-password';

  if (base) {
    return new URL(path, base);
  }

  return path;
}

export function getVerifyEmailUrl({ base }: URLProps) {
  const path = process.env.NEXT_PUBLIC_PXYZ_VERIFY_EMAIL_URL ?? '/verify-email';

  if (base) {
    return new URL(path, base);
  }

  return path;
}

export function getVerifyPhoneUrl({ base }: URLProps) {
  const path = process.env.NEXT_PUBLIC_PXYZ_VERIFY_PHONE_URL ?? '/verify-phone';

  if (base) {
    return new URL(path, base);
  }

  return path;
}

export function getUserProfileUrl({ base }: URLProps) {
  const path = process.env.NEXT_PUBLIC_PXYZ_USER_PROFILE_URL ?? '/user';

  if (base) {
    return new URL(path, base);
  }

  return path;
}

export function getOrganizationProfileUrl({ base }: URLProps) {
  const path =
    process.env.NEXT_PUBLIC_PXYZ_ORGANIZATION_PROFILE_URL ?? '/organization';

  if (base) {
    return new URL(path, base);
  }

  return path;
}
