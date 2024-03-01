import bcrypt from "bcryptjs";

import { User } from "@abhub/core";

import type { Auth, AuthActionState } from "..";
import type { ChangePasswordInput } from "../schemas";
import { changePasswordSchema } from "../schemas";

export async function changePassword(
  { auth }: Auth,
  unsafeInput: ChangePasswordInput,
): Promise<AuthActionState> {
  try {
    const input = changePasswordSchema.safeParse(unsafeInput);

    if (!input.success) {
      return {
        status: "error",
        message: "Failed to change password.",
        errors: input.error.flatten().fieldErrors,
      };
    }

    const session = await auth({});

    if (!session) {
      return {
        status: "error",
        message: "Invalid session.",
        errors: {} as Record<string, string[]>,
      };
    }

    const user = await User.get({ id: session?.user.id });

    if (!user) {
      return {
        status: "error",
        errors: {} as Record<string, string[]>,
        message: "Invalid user",
      };
    }

    const { currentPassword, password } = input.data;

    if (user.password) {
      const passwordsMatch = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!passwordsMatch) {
        return {
          status: "error",
          errors: {} as Record<string, string[]>,
          message: "Current password is incorrect",
        };
      }
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    if (encryptedPassword === user.password) {
      return {
        status: "error",
        errors: {} as Record<string, string[]>,
        message: "New password cannot be the same as the old password",
      };
    }

    await User.update(session?.user.id, { password });

    if (!user) {
      return {
        status: "error",
        errors: {} as Record<string, string[]>,
        message: "Failed to update user",
      };
    }

    return {
      status: "success",
      errors: {} as Record<string, string[]>,
      message: "Password updated",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return {
      status: "error",
      // TODO: Remove this cast when the type is fixed.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: error.message as string,
      errors: {} as Record<string, string[]>,
    };
  }
}
