import {
  FrontendEndSessionPath,
  FrontendIssueTokenPath,
  FrontendListSessionsPath,
} from '@/frontend/paths';
import { ProtocolFrontendClient } from '../../pxyz';
import {
  FrontendEndSessionOptions,
  FrontendIssueSessionTokenOptions,
  FrontendListSessionsOptions,
} from '../../requests';
import {
  FrontendEndSession200Response,
  FrontendIssueSessionToken200Response,
  FrontendListSessions200Response,
} from '../../responses';

export class ProtocolAuthSessionsService {
  private protocol: ProtocolFrontendClient;

  constructor(protocol: ProtocolFrontendClient) {
    this.protocol = protocol;
  }

  list(
    options?: FrontendListSessionsOptions,
  ): Promise<FrontendListSessions200Response> {
    return this.protocol.client.request<FrontendListSessions200Response>(
      'GET',
      FrontendListSessionsPath,
      options,
    );
  }

  end(
    options?: FrontendEndSessionOptions,
  ): Promise<FrontendEndSession200Response> {
    return this.protocol.client.request<FrontendEndSession200Response>(
      'DELETE',
      FrontendEndSessionPath,
      options,
    );
  }

  issueToken(
    options?: FrontendIssueSessionTokenOptions,
  ): Promise<FrontendIssueSessionToken200Response> {
    return this.protocol.client.request<FrontendIssueSessionToken200Response>(
      'POST',
      FrontendIssueTokenPath,
      options,
    );
  }
}
