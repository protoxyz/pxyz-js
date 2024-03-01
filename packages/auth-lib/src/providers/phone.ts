import type { AuthProvider } from "../types";

export interface PhoneProviderConfig {
  ok?: boolean;
}

export const Phone = (_config: PhoneProviderConfig): AuthProvider => ({
  id: "phone",
});
