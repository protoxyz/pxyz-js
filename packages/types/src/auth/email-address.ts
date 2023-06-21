export interface EmailAddress {
    id: string;
    userId: string | null | undefined;
    email: string | null | undefined;
    verifiedAt: Date | null | undefined;
    createdAt: Date | string;
    updatedAt: Date | string;
}
