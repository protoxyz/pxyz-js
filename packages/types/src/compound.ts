import { AuthInstance } from "./auth/instance";
import { Organization } from "./auth/organization";
import { Project } from "./project";

export interface ProjectWithInstances extends Project {
    authInstances: AuthInstanceWithCount[];
    organization?: Organization | null | undefined;
}

export interface OrganizationWithProjects extends Organization {
    projects: ProjectWithInstances[];
}

export interface AuthInstanceWithCount
    extends Pick<AuthInstance, "id" | "projectId" | "environment" | "createdAt" | "updatedAt"> {
    _count: {
        users: number;
        organizations: number;
    };
}
