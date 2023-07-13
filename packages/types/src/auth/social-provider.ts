export interface InstanceSocialProvider {
  id: string;
  providerKey: string;
  enabled: boolean;
  additionalScopes: string[];
}

export interface SocialProvider {
  enabled: boolean;
  providerKey: string;
}
