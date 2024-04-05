import {
  FrontendAttemptSignInAttemptFirstFactorPath,
  FrontendAttemptSignInAttemptSecondFactorPath,
  FrontendCreateSignInAttemptPath,
  FrontendGetSignInAttemptPath,
  FrontendPrepareSignInAttemptFirstFactorPath,
  FrontendPrepareSignInAttemptSecondFactorPath,
  FrontendUpdateSignInAttemptPath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendAttemptSignInAttemptFirstFactorOptions,
  FrontendAttemptSignInAttemptSecondFactorOptions,
  FrontendCreateSignInAttemptOptions,
  FrontendGetSignInAttemptOptions,
  FrontendPrepareSignInAttemptFirstFactorOptions,
  FrontendPrepareSignInAttemptSecondFactorOptions,
  FrontendUpdateSignInAttemptOptions,
} from '../../requests';
import {
  FrontendAttemptSignInAttemptFirstFactor200Response,
  FrontendAttemptSignInAttemptSecondFactor200Response,
  FrontendCreateSignInAttempt201Response,
  FrontendGetSignInAttempt200Response,
  FrontendPrepareSignInAttemptFirstFactor200Response,
  FrontendPrepareSignInAttemptSecondFactor200Response,
  FrontendUpdateSignInAttempt200Response,
} from '../../responses';

export class ProtocolAuthSignInAttemptsService {
  private protocol: ProtocolFrontendClient;

  constructor(protocolAuth: ProtocolFrontendClient) {
    this.protocol = protocolAuth;
  }

  get(
    options?: FrontendGetSignInAttemptOptions,
  ): Promise<FrontendGetSignInAttempt200Response> {
    return this.protocol.client.request<FrontendGetSignInAttempt200Response>(
      'GET',
      FrontendGetSignInAttemptPath,
      options,
    );
  }

  create(
    options: FrontendCreateSignInAttemptOptions,
  ): Promise<FrontendCreateSignInAttempt201Response> {
    return this.protocol.client.request<FrontendCreateSignInAttempt201Response>(
      'POST',
      FrontendCreateSignInAttemptPath,
      options,
    );
  }

  update(
    options: FrontendUpdateSignInAttemptOptions,
  ): Promise<FrontendUpdateSignInAttempt200Response> {
    return this.protocol.client.request<FrontendUpdateSignInAttempt200Response>(
      'PATCH',
      FrontendUpdateSignInAttemptPath,
      options,
    );
  }

  prepareFirstFactor(
    options: FrontendPrepareSignInAttemptFirstFactorOptions,
  ): Promise<FrontendPrepareSignInAttemptFirstFactor200Response> {
    return this.protocol.client.request<FrontendPrepareSignInAttemptFirstFactor200Response>(
      'POST',
      FrontendPrepareSignInAttemptFirstFactorPath,
      options,
    );
  }

  attemptFirstFactor(
    options: FrontendAttemptSignInAttemptFirstFactorOptions,
  ): Promise<FrontendAttemptSignInAttemptFirstFactor200Response> {
    return this.protocol.client.request<FrontendAttemptSignInAttemptFirstFactor200Response>(
      'POST',
      FrontendAttemptSignInAttemptFirstFactorPath,
      options,
    );
  }

  prepareSecondFactor(
    options: FrontendPrepareSignInAttemptSecondFactorOptions,
  ): Promise<FrontendPrepareSignInAttemptSecondFactor200Response> {
    return this.protocol.client.request<FrontendPrepareSignInAttemptSecondFactor200Response>(
      'POST',
      FrontendPrepareSignInAttemptSecondFactorPath,
      options,
    );
  }

  attemptSecondFactor(
    options: FrontendAttemptSignInAttemptSecondFactorOptions,
  ): Promise<FrontendAttemptSignInAttemptSecondFactor200Response> {
    return this.protocol.client.request<FrontendAttemptSignInAttemptSecondFactor200Response>(
      'POST',
      FrontendAttemptSignInAttemptSecondFactorPath,
      options,
    );
  }
}
