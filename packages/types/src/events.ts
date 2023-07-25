export const CoreEvent = {
  user_organization_created: 'user_organization.created',
  user_organization_updated: 'user_organization.updated',
  user_organization_deleted: 'user_organization.deleted',

  tenant_created: 'tenant.created',
  tenant_updated: 'tenant.updated',
  tenant_deleted: 'tenant.deleted',

  api_key_created: 'api_key.created',
  api_key_deleted: 'api_key.deleted',

  domain_created: 'domain.created',
  domain_updated: 'domain.updated',
  domain_deleted: 'domain.deleted',

  domain_verification_prepared: 'domain.verification_prepared',
  domain_verification_attempted: 'domain.verification_attempted',
  domain_verification_completed: 'domain.verification_completed',

  domain_certificate_created: 'domain_certificate.created',
  domain_certificate_updated: 'domain_certificate.updated',
  domain_certificate_deleted: 'domain_certificate.deleted',

  domain_certificate_verification_prepared:
    'domain_certificate.verification_prepared',
  domain_certificate_verification_attempted:
    'domain_certificate.verification_attempted',
  domain_certificate_verification_completed:
    'domain_certificate.verification_completed',

  webhook_created: 'webhook.created',
  webhook_updated: 'webhook.updated',
  webhook_deleted: 'webhook.deleted',
};
export type CoreEvent = (typeof CoreEvent)[keyof typeof CoreEvent];

export const BillingEvent = {
  invoice_created: 'invoice.created',
  invoice_updated: 'invoice.updated',
  invoice_deleted: 'invoice.deleted',

  invoice_item_created: 'invoice_item.created',
  invoice_item_updated: 'invoice_item.updated',
  invoice_item_deleted: 'invoice_item.deleted',

  payment_created: 'payment.created',
  payment_updated: 'payment.updated',
  payment_deleted: 'payment.deleted',

  payment_method_created: 'payment_method.created',
  payment_method_updated: 'payment_method.updated',
  payment_method_deleted: 'payment_method.deleted',

  subscription_created: 'subscription.created',
  subscription_updated: 'subscription.updated',
  subscription_deleted: 'subscription.deleted',

  subscription_item_created: 'subscription_item.created',
  subscription_item_updated: 'subscription_item.updated',
  subscription_item_deleted: 'subscription_item.deleted',

  subscription_schedule_created: 'subscription_schedule.created',
  subscription_schedule_updated: 'subscription_schedule.updated',
  subscription_schedule_deleted: 'subscription_schedule.deleted',

  subscription_schedule_item_created: 'subscription_schedule_item.created',
  subscription_schedule_item_updated: 'subscription_schedule_item.updated',
  subscription_schedule_item_deleted: 'subscription_schedule_item.deleted',

  usage_record_created: 'usage_record.created',
  usage_record_updated: 'usage_record.updated',
  usage_record_deleted: 'usage_record.deleted',

  usage_record_summary_created: 'usage_record_summary.created',
  usage_record_summary_updated: 'usage_record_summary.updated',
  usage_record_summary_deleted: 'usage_record_summary.deleted',

  usage_record_summary_item_created: 'usage_record_summary_item.created',
  usage_record_summary_item_updated: 'usage_record_summary_item.updated',
  usage_record_summary_item_deleted: 'usage_record_summary_item.deleted',
};

export type BillingEvent = (typeof BillingEvent)[keyof typeof BillingEvent];

export const AuthEvent = {
  sign_in_attempt_created: 'sign_in_attempt.created',
  sign_in_attempt_first_factor_prepared:
    'sign_in_attempt.first_factor_prepared',
  sign_in_attempt_first_factor_attempted:
    'sign_in_attempt.first_factor_attempted',
  sign_in_attempt_second_factor_prepared:
    'sign_in_attempt.second_factor_prepared',
  sign_in_attempt_second_factor_attempted:
    'sign_in_attempt.second_factor_attempted',
  sign_in_attempt_completed: 'sign_in_attempt.completed',

  sign_up_attempt_created: 'sign_up_attempt.created',
  sign_up_attempt_verification_prepared:
    'sign_up_attempt.verification_prepared',
  sign_up_attempt_verification_attempted:
    'sign_up_attempt.verification_attempted',
  sign_up_attempt_completed: 'sign_up_attempt.completed',

  user_created: 'user.created',
  user_updated: 'user.updated',
  user_deleted: 'user.deleted',
  user_logged_in: 'user.logged_in',
  user_logged_out: 'user.logged_out',

  email_created: 'email.created',
  email_updated: 'email.updated',
  email_deleted: 'email.deleted',
  email_verification_prepared: 'email.verification_prepared',
  email_verification_attempted: 'email.verification_attempted',
  email_verification_completed: 'email.verification_completed',

  phone_created: 'phone.created',
  phone_updated: 'phone.updated',
  phone_deleted: 'phone.deleted',
  phone_verification_prepared: 'phone.verification_prepared',
  phone_verification_attempted: 'phone.verification_attempted',
  phone_verification_completed: 'phone.verification_completed',

  social_connection_created: 'social_connection.created',
  social_connection_updated: 'social_connection.updated',
  social_connection_deleted: 'social_connection.deleted',

  organization_created: 'organization.created',
  organization_updated: 'organization.updated',
  organization_deleted: 'organization.deleted',

  organization_invitation_created: 'organization_invitation.created',
  organization_invitation_updated: 'organization_invitation.updated',
  organization_invitation_deleted: 'organization_invitation.deleted',
  organization_invitation_accepted: 'organization_invitation.accepted',
  organization_invitation_declined: 'organization_invitation.declined',

  organization_membership_created: 'organization_membership.created',
  organization_membership_updated: 'organization_membership.updated',
  organization_membership_deleted: 'organization_membership.deleted',

  session_created: 'session.created',
  session_updated: 'session.updated',
  session_deleted: 'session.deleted',
};
export type AuthEvent = (typeof AuthEvent)[keyof typeof AuthEvent];

export type ProtocolEvent = CoreEvent & AuthEvent & BillingEvent;

export type AuthEventPayload = any;
