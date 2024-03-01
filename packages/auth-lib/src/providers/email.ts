import type { AuthProvider } from "../types";

export interface EmailProviderConfig {
  ok?: boolean;
}

export const Email = (_config: EmailProviderConfig): AuthProvider => ({
  id: "email",
});
