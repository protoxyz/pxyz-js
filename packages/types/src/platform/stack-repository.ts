import { UserProfile } from "../auth/user-profile";
import { Project } from "../project";
import { StarterKit } from "../starter-kit";
import { StackRepositoryStatus } from "./stack-repository-status";
import { StackService } from "./stack-service";

export type StackRepository = {
    id: string;

    projectId: string;
    project?: Project | null;

    creatorId: string;
    creator?: UserProfile | null;

    sourceOwner?: string;
    sourceRepo?: string;

    owner: string;
    repo: string;

    uri: string;

    status: StackRepositoryStatus;

    starterKitId?: string | null;
    starterKit?: StarterKit | null | undefined;

    error?: string | null;

    services?: StackService[];

    createdAt: string;
    updatedAt: string;
};
