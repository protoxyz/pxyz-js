import {
  FrontendCreateEmailAddressPath,
  FrontendDeleteEmailAddressPath,
  FrontendListEmailAddressesPath,
  FrontendResendEmailAddressVerificationPath,
  FrontendSetEmailAddressPrimaryPath,
  FrontendVerifyEmailAddressPath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendCreateEmailAddressOptions,
  FrontendDeleteEmailAddressOptions,
  FrontendListEmailAddressesOptions,
  FrontendResendEmailAddressVerificationOptions,
  FrontendSetEmailAddressPrimaryOptions,
  FrontendVerifyEmailAddressOptions,
} from '../../requests';
import {
  FrontendCreateEmailAddress201Response,
  FrontendDeleteEmailAddress200Response,
  FrontendListEmailAddresses200Response,
  FrontendResendEmailAddressVerification200Response,
  FrontendSetEmailAddressPrimary200Response,
  FrontendVerifyEmailAddress200Response,
} from '../../responses';

export class ProtocolAuthEmailAddresssService {
  private protocol: ProtocolFrontendClient;

  constructor(protocolAuth: ProtocolFrontendClient) {
    this.protocol = protocolAuth;
  }

  list(
    options?: FrontendListEmailAddressesOptions,
  ): Promise<FrontendListEmailAddresses200Response> {
    return this.protocol.client.request<FrontendListEmailAddresses200Response>(
      'GET',
      FrontendListEmailAddressesPath,
      options,
    );
  }

  create(
    options?: FrontendCreateEmailAddressOptions,
  ): Promise<FrontendCreateEmailAddress201Response> {
    return this.protocol.client.request<FrontendCreateEmailAddress201Response>(
      'POST',
      FrontendCreateEmailAddressPath,
      options,
    );
  }

  delete(
    options?: FrontendDeleteEmailAddressOptions,
  ): Promise<FrontendDeleteEmailAddress200Response> {
    return this.protocol.client.request<FrontendDeleteEmailAddress200Response>(
      'DELETE',
      FrontendDeleteEmailAddressPath,
      options,
    );
  }

  verify(
    options?: FrontendVerifyEmailAddressOptions,
  ): Promise<FrontendVerifyEmailAddress200Response> {
    return this.protocol.client.request<FrontendVerifyEmailAddress200Response>(
      'POST',
      FrontendVerifyEmailAddressPath,
      options,
    );
  }

  resendVerification(
    options?: FrontendResendEmailAddressVerificationOptions,
  ): Promise<FrontendResendEmailAddressVerification200Response> {
    return this.protocol.client.request<FrontendResendEmailAddressVerification200Response>(
      'POST',
      FrontendResendEmailAddressVerificationPath,
      options,
    );
  }

  setPrimary(
    options?: FrontendSetEmailAddressPrimaryOptions,
  ): Promise<FrontendSetEmailAddressPrimary200Response> {
    return this.protocol.client.request<FrontendSetEmailAddressPrimary200Response>(
      'POST',
      FrontendSetEmailAddressPrimaryPath,
      options,
    );
  }
}
