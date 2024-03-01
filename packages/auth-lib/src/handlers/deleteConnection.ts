import { Account } from "@abhub/core";

import type { Auth } from "..";
import type { DeleteConnectionInput } from "../schemas";
import { deleteConnectionInput } from "../schemas";

export interface DeleteConnectionResult {
  status: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function deleteConnection(
  { auth }: Auth,
  unsafeInput: DeleteConnectionInput,
): Promise<DeleteConnectionResult> {
  try {
    const input = deleteConnectionInput.safeParse(unsafeInput);

    if (!input.success) {
      return {
        status: "error",
        message: "Failed to parse input.",
        errors: input.error.flatten().fieldErrors,
      };
    }

    const session = await auth({});

    if (!session) {
      return {
        status: "error",
        message: "Invalid session.",
        errors: {},
      };
    }

    return await Account.deleteAccount(session?.user.id, input.data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return {
      status: "error",
      // TODO: Remove this cast when the type is fixed.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: error.message as string,
      errors: {},
    };
  }
}
