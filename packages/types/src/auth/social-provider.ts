export interface InstanceSocialProvider {
    id: string;
    providerKey: string;
    enabled: boolean;
}

export interface SocialProvider {
    enabled: boolean;
    providerKey: string;
}
