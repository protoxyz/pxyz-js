import {
  FrontendCreatePhoneNumberPath,
  FrontendDeletePhoneNumberPath,
  FrontendListPhoneNumbersPath,
  FrontendPreparePhoneNumberVerificationPath,
  FrontendSetPhoneNumberPrimaryPath,
  FrontendVerifyPhoneNumberPath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendCreatePhoneNumberOptions,
  FrontendDeletePhoneNumberOptions,
  FrontendListPhoneNumbersOptions,
  FrontendPreparePhoneNumberVerificationOptions,
  FrontendSetPhoneNumberPrimaryOptions,
  FrontendVerifyPhoneNumberOptions,
} from '../../requests';
import {
  FrontendCreatePhoneNumber201Response,
  FrontendDeletePhoneNumber200Response,
  FrontendListPhoneNumbers200Response,
  FrontendPreparePhoneNumberVerification200Response,
  FrontendSetPhoneNumberPrimary200Response,
  FrontendVerifyPhoneNumber200Response,
} from '../../responses';

export class ProtocolAuthPhoneNumbersService {
  private protocol: ProtocolFrontendClient;

  constructor(protocolAuth: ProtocolFrontendClient) {
    this.protocol = protocolAuth;
  }

  list(
    options?: FrontendListPhoneNumbersOptions,
  ): Promise<FrontendListPhoneNumbers200Response> {
    return this.protocol.client.request<FrontendListPhoneNumbers200Response>(
      'GET',
      FrontendListPhoneNumbersPath,
      options,
    );
  }

  create(
    options?: FrontendCreatePhoneNumberOptions,
  ): Promise<FrontendCreatePhoneNumber201Response> {
    return this.protocol.client.request<FrontendCreatePhoneNumber201Response>(
      'POST',
      FrontendCreatePhoneNumberPath,
      options,
    );
  }

  delete(
    options?: FrontendDeletePhoneNumberOptions,
  ): Promise<FrontendDeletePhoneNumber200Response> {
    return this.protocol.client.request<FrontendDeletePhoneNumber200Response>(
      'DELETE',
      FrontendDeletePhoneNumberPath,
      options,
    );
  }

  verify(
    options?: FrontendVerifyPhoneNumberOptions,
  ): Promise<FrontendVerifyPhoneNumber200Response> {
    return this.protocol.client.request<FrontendVerifyPhoneNumber200Response>(
      'POST',
      FrontendVerifyPhoneNumberPath,
      options,
    );
  }

  prepareVerification(
    options?: FrontendPreparePhoneNumberVerificationOptions,
  ): Promise<FrontendPreparePhoneNumberVerification200Response> {
    return this.protocol.client.request<FrontendPreparePhoneNumberVerification200Response>(
      'POST',
      FrontendPreparePhoneNumberVerificationPath,
      options,
    );
  }

  setPrimary(
    options?: FrontendSetPhoneNumberPrimaryOptions,
  ): Promise<FrontendSetPhoneNumberPrimary200Response> {
    return this.protocol.client.request<FrontendSetPhoneNumberPrimary200Response>(
      'POST',
      FrontendSetPhoneNumberPrimaryPath,
      options,
    );
  }
}
