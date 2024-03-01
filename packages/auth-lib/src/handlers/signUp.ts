import { User } from "@abhub/core";

import type { Auth, AuthActionState, AuthUser } from "..";
import type { SignUpWithCredentialsInput } from "../schemas";
import { signUpWithCredentialsSchema } from "../schemas";

export interface SignUpResult {
  error?: string;
  user?: AuthUser;
}

export async function signUp(
  auth: Auth,
  provider: string,
  input?: SignUpWithCredentialsInput,
): Promise<SignUpResult> {
  switch (provider) {
    case "credentials":
      return await signUpWithCredentials(auth, input!);
    default:
      return { error: "Invalid provider." };
  }
}

export async function signUpWithCredentials(
  auth: Auth,
  unsafeInput: SignUpWithCredentialsInput,
) {
  const input = signUpWithCredentialsSchema.safeParse(unsafeInput);

  if (!input.success) {
    return {
      status: "failed",
      message: "Failed to sign up.",
      errors: {},
    } as AuthActionState;
  }

  const user = await User.create(input.data);

  if (!user) {
    return {
      status: "failed",
      message: "Failed to sign up.",
      errors: {},
    } as AuthActionState;
  }

  if ("errors" in user) {
    return {
      status: "failed",
      message: "Failed to sign up.",
      errors: {},
    } as AuthActionState;
  }

  return {
    status: "success",
    message: "Successfully signed up.",
    errors: {},
    user,
  } as AuthActionState;
}
