import {
  FrontendAttemptSignUpAttemptVerificationPath,
  FrontendCreateSignUpAttemptPath,
  FrontendGetSignUpAttemptPath,
  FrontendPrepareSignUpAttemptVerificationPath,
  FrontendUpdateSignUpAttemptPath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendAttemptSignUpAttemptVerificationOptions,
  FrontendCreateSignUpAttemptOptions,
  FrontendGetSignUpAttemptOptions,
  FrontendPrepareSignUpAttemptVerificationOptions,
  FrontendUpdateSignUpAttemptOptions,
} from '../../requests';
import {
  FrontendAttemptSignUpAttemptVerification200Response,
  FrontendCreateSignUpAttempt201Response,
  FrontendGetSignUpAttempt200Response,
  FrontendPrepareSignUpAttemptVerification200Response,
  FrontendUpdateSignUpAttempt200Response,
} from '../../responses';

export class ProtocolAuthSignUpAttemptsService {
  private protocol: ProtocolFrontendClient;

  constructor(protocol: ProtocolFrontendClient) {
    this.protocol = protocol;
  }

  create(
    options?: FrontendCreateSignUpAttemptOptions,
  ): Promise<FrontendCreateSignUpAttempt201Response> {
    return this.protocol.client.request<FrontendCreateSignUpAttempt201Response>(
      'POST',
      FrontendCreateSignUpAttemptPath,
      options,
    );
  }

  get(
    options?: FrontendGetSignUpAttemptOptions,
  ): Promise<FrontendGetSignUpAttempt200Response> {
    return this.protocol.client.request<FrontendGetSignUpAttempt200Response>(
      'GET',
      FrontendGetSignUpAttemptPath,
      options,
    );
  }

  update(
    options: FrontendUpdateSignUpAttemptOptions,
  ): Promise<FrontendUpdateSignUpAttempt200Response> {
    return this.protocol.client.request<FrontendUpdateSignUpAttempt200Response>(
      'PATCH',
      FrontendUpdateSignUpAttemptPath,
      options,
    );
  }

  prepareVerification(
    options: FrontendPrepareSignUpAttemptVerificationOptions,
  ): Promise<FrontendPrepareSignUpAttemptVerification200Response> {
    return this.protocol.client.request<FrontendPrepareSignUpAttemptVerification200Response>(
      'POST',
      FrontendPrepareSignUpAttemptVerificationPath,
      options,
    );
  }

  attemptVerification(
    options: FrontendAttemptSignUpAttemptVerificationOptions,
  ): Promise<FrontendAttemptSignUpAttemptVerification200Response> {
    return this.protocol.client.request<FrontendAttemptSignUpAttemptVerification200Response>(
      'POST',
      FrontendAttemptSignUpAttemptVerificationPath,
      options,
    );
  }
}
