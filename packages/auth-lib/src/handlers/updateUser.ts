import { User } from "@abhub/core";

import type { Auth, AuthActionState, AuthUser } from "..";
import type { UpdateUserInput } from "../schemas";
import { updateUserSchema } from "../schemas";

export interface UpdateUserResult {
  status: string;
  message: string;
  errors: Record<string, string[]>;
  user?: AuthUser;
}

export async function updateUser(
  { auth }: Auth,
  unsafeInput: UpdateUserInput,
): Promise<AuthActionState> {
  try {
    const session = await auth({});
    if (!session) {
      return {
        status: "error",
        message: "Invalid session.",
        errors: {},
      };
    }

    const input = updateUserSchema.safeParse(unsafeInput);

    if (!input.success) {
      return {
        status: "error",
        message: "Failed to update user.",
        errors: input.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    return await User.update(session?.user.id, input.data);
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Error updating user.",
      errors: {},
    };
  }
}
