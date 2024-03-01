import type { AuthProvider } from "../types";

export interface CredentialsConfig {
  field: "email" | "username" | "phone";
}

export const Credentials = (_config: CredentialsConfig): AuthProvider => ({
  id: "credentials",
});
