import { Protocol } from '../../pxyz';
import {
  CreateEmailAddressOptions,
  DeleteEmailAddressOptions,
  ListEmailAddressesOptions,
  ResendEmailAddressVerificationOptions,
  SetEmailAddressPrimaryOptions,
  VerifyEmailAddressOptions,
} from '../../requests';
import {
  CreateEmailAddress201Response,
  DeleteEmailAddress200Response,
  ListEmailAddresses200Response,
  ResendEmailAddressVerification200Response,
  SetEmailAddressPrimary200Response,
  VerifyEmailAddress200Response,
} from '../../responses';

export const ListEmailAddressesPath = '/api/auth/frontend/v0/user/emails';
export const CreateEmailAddressPath = '/api/auth/frontend/v0/user/emails';
export const DeleteEmailAddressPath =
  '/api/auth/frontend/v0/user/emails/{emailId}';
export const VerifyEmailAddressPath =
  '/api/auth/frontend/v0/user/emails/{emailId}/verify';
export const ResendEmailAddressVerificationPath =
  '/api/auth/frontend/v0/user/emails/{emailId}/resend';
export const SetEmailAddressPrimaryPath =
  '/api/auth/frontend/v0/user/emails/{emailId}/primary';

export class ProtocolAuthEmailAddresssService {
  private protocol: Protocol;

  constructor(protocolAuth: Protocol) {
    this.protocol = protocolAuth;
  }

  list(
    options?: ListEmailAddressesOptions,
  ): Promise<ListEmailAddresses200Response> {
    return this.protocol.client.request<ListEmailAddresses200Response>(
      'GET',
      ListEmailAddressesPath,
      options,
    );
  }

  create(
    options?: CreateEmailAddressOptions,
  ): Promise<CreateEmailAddress201Response> {
    return this.protocol.client.request<CreateEmailAddress201Response>(
      'POST',
      CreateEmailAddressPath,
      options,
    );
  }

  delete(
    options?: DeleteEmailAddressOptions,
  ): Promise<DeleteEmailAddress200Response> {
    return this.protocol.client.request<DeleteEmailAddress200Response>(
      'DELETE',
      DeleteEmailAddressPath,
      options,
    );
  }

  verify(
    options?: VerifyEmailAddressOptions,
  ): Promise<VerifyEmailAddress200Response> {
    return this.protocol.client.request<VerifyEmailAddress200Response>(
      'POST',
      VerifyEmailAddressPath,
      options,
    );
  }

  resendVerification(
    options?: ResendEmailAddressVerificationOptions,
  ): Promise<ResendEmailAddressVerification200Response> {
    return this.protocol.client.request<ResendEmailAddressVerification200Response>(
      'POST',
      ResendEmailAddressVerificationPath,
      options,
    );
  }

  setPrimary(
    options?: SetEmailAddressPrimaryOptions,
  ): Promise<SetEmailAddressPrimary200Response> {
    return this.protocol.client.request<SetEmailAddressPrimary200Response>(
      'POST',
      SetEmailAddressPrimaryPath,
      options,
    );
  }
}
