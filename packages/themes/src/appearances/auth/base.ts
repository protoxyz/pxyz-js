import { AuthAppearance, AuthTheme } from '@/types/auth';

export const BaseAppearance: AuthAppearance<AuthTheme> = {
  layout: {
    logoPlacement: 'inside',
    logoImageUrl: null,
    socialButtonsVariant: 'auto',
    socialButtonsPlacement: 'bottom',
    showOptionalFields: true,
    tosUrl: null,
    privacyPolicyUrl: null,
    helpUrl: null,
  },

  variables: {},

  elements: {
    card: '',
  },
};
