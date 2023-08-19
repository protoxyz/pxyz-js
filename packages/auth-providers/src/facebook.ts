import type { OAuthProfile, OAuthProvider } from '.';

interface FacebookPictureData {
  url: string;
}

interface FacebookPicture {
  data: FacebookPictureData;
}
export interface FacebookProfile extends Record<string, any> {
  picture: FacebookPicture;
}

export default {
  id: 'facebook',
  name: 'Facebook',
  description: 'Allow users to connect their Facebook accounts',
  type: 'oauth',
  authorization: new URL(
    'https://www.facebook.com/v15.0/dialog/oauth?scope=email',
  ),
  token: new URL('https://graph.facebook.com/oauth/access_token'),
  scope: ['email'],
  checks: ['pkce', 'state'],
  issuer: new URL('https://www.facebook.com'),

  userInfo: {
    url: new URL('https://graph.facebook.com/me?fields=id,name,email,picture'),
    async request({ tokens, provider }) {
      return await fetch(provider.userInfo.url as URL, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }).then((res) => res.json());
    },
  },

  profile: (profile: OAuthProfile & FacebookProfile) => {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      emailVerified: profile.email_verified,
      image: profile.picture.data?.url,
    };
  },

  clientId: '',
  clientSecret: '',
} as OAuthProvider;
