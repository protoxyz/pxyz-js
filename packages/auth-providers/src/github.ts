import type { OAuthProvider } from '.';

export interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: 'public' | 'private';
}

export interface GithubProfile extends Record<string, any> {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username?: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists?: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
  suspended_at?: string | null;
  collaborators?: number;
  two_factor_authentication: boolean;
  plan?: {
    collaborators: number;
    name: string;
    space: number;
    private_repos: number;
  };
}

export default {
  id: 'github',
  name: 'GitHub',
  type: 'oauth',
  description: 'Allow users to connect their Github accounts',
  issuer: new URL('https://github.com'),
  authorization: new URL('https://github.com/login/oauth/authorize'),
  token: new URL('https://github.com/login/oauth/access_token'),
  userInfo: new URL('https://api.github.com/user'),
  scope: ['read:user', 'user:email'],
  clientId: '',
  clientSecret: '',
  checks: ['pkce', 'state'],
  profile: (profile: GithubProfile) => {
    return {
      id: profile.id.toString(),
      name: profile.name ?? profile.login,
      email: profile.email,
      emailVerified: profile.email_verified,
      picture: profile.avatar_url,
      username: profile.login ?? profile.name,
    };
  },
} as OAuthProvider;
