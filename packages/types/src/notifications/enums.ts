export enum NotificationType {
  email = 'email',
  sms = 'sms',
  push = 'push',
  webhook = 'webhook',
  inapp = 'inapp',
  chat = 'chat',
}

export enum NotificationProvider {
  email_pxyz = 'email_pxyz',
  email_aws_ses = 'email_aws_ses',
  email_mailgun = 'email_mailgun',
  email_mailjet = 'email_mailjet',
  email_mailersend = 'email_mailersend',
  email_mailtrap = 'email_mailtrap',
  email_mandrill = 'email_mandrill',
  email_postmark = 'email_postmark',
  email_sendgrid = 'email_sendgrid',
  email_sparkpost = 'email_sparkpost',
  email_resend = 'email_resend',

  inapp_pxyz = 'inapp_pxyz',

  push_firebase = 'push_firebase',
  push_apns = 'push_apns',
  push_expo = 'push_expo',

  sms_pxyz = 'sms_pxyz',
  sms_twilio = 'sms_twilio',
  sms_telnyx = 'sms_telnyx',
  sms_mailersend = 'sms_mailersend',
  sms_messagebird = 'sms_messagebird',
  sms_africas_talking = 'sms_africas_talking',
  sms_vonage = 'sms_vonage',
  sms_sinch = 'sms_sinch',
  sms_aws_sns = 'sms_aws_sns',
  sms_plivo = 'sms_plivo',

  chat_slack = 'chat_slack',
  chat_microsoft_teams = 'chat_microsoft_teams',
  chat_discord = 'chat_discord',
  chat_whatsapp = 'chat_whatsapp',

  webhook = 'webhook',
}
