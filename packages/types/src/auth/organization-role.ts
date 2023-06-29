export interface OrganizationRole {
    id: string;
    name: string;
    slug: string;
    dsecription: string | undefined;
    permisssions: string[];
    createdAt: Date | string;
    updatedAt: Date | string;
}
