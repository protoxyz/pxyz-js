import { AuthInstance, SessionUser } from "./auth";
import { StackRepository } from "./platform";

export interface PaginatedMeta {
    total: number;
    count: number;
    numPages: number;
    perPage: number;
    prev?: string | null | undefined;
    next?: string | null | undefined;
}
export const Environment = {
    development: "development",
    staging: "staging",
    production: "production",
};
export type Environment = (typeof Environment)[keyof typeof Environment];

export interface ProjectWithInstances extends Project {
    authInstances: AuthInstanceWithCount[];
    organization?: Organization | null | undefined;
}

export interface Organization {
    id: string;
    name: string;
    slug: string;
    imageUri?: string | null | undefined;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface OrganizationRole {
    id: string;
    name: string;
    slug: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface OrganizationMember {
    id: string;
    userId: string;
    user?: SessionUser;
    organizationId: string;
    organization?: Organization;
    role: OrganizationRole;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface OrganizationInvitation {
    id: string;
    organizationId: string;
    organization?: Organization;
    email?: string;
    phone?: string;
    role: OrganizationRole;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface OrganizationWithProjects extends Organization {
    projects: ProjectWithInstances[];
}

export interface Project {
    id: string;
    organizationId?: string | null | undefined;
    organization?: Organization | null | undefined;
    name: string;
    slug: string;
    imageUri: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface AuthInstanceWithCount
    extends Pick<AuthInstance, "id" | "projectId" | "environment" | "createdAt" | "updatedAt"> {
    _count: {
        users: number;
        organizations: number;
    };
}

export interface StarterKit {
    id: string;

    organizationId?: string | null;
    organization?: Organization | null;

    name: string;
    slug: string;
    description?: string | null;
    imageUri?: string | null;
    repositoryUri: string;
    status: StarterKitStatus;
    protocolServices: string[];
    repositories?: StackRepository[] | null | undefined;

    createdAt: Date;
    updatedAt: Date;
}

export const StarterKitStatus = {
    created: "created",
    featured: "featured",
    public: "public",
};
export type StarterKitStatus = (typeof StarterKitStatus)[keyof typeof StarterKitStatus];
