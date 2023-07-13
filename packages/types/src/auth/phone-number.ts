export interface PhoneNumber {
  id: string;
  userId: string | null | undefined;
  phone: string | null | undefined;
  verifiedAt: Date | null | undefined;
  createdAt: Date | string;
  updatedAt: Date | string;
}
