import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  publicMeta: z.record(z.any()).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const signUpWithCredentialsSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  publicMeta: z.record(z.any()).optional(),
});

export type SignUpWithCredentialsInput = z.infer<
  typeof signUpWithCredentialsSchema
>;

export const signInWithCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInWithCredentialsInput = z.infer<
  typeof signInWithCredentialsSchema
>;

export const changePasswordSchema = z.object({
  password: z.string().min(8),
  currentPassword: z.string().min(8),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const deleteConnectionInput = z.object({
  provider: z.string(),
  providerAccountId: z.string(),
});

export type DeleteConnectionInput = z.infer<typeof deleteConnectionInput>;
