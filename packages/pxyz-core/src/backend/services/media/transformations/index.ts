import { ProtocolBackendClient } from '@/backend/pxyz';
import {
  CreateTransformationOptions,
  DeleteTransformationOptions,
  GetTransformationOptions,
  ListTransformationsOptions,
  UpdateTransformationOptions,
} from './requests';
import {
  CreateTransformation201Response,
  DeleteTransformation200Response,
  GetTransformation200Response,
  ListTransformations200Response,
} from './responses';

export const ListTransformationsPath =
  '/api/v0/tenants/{tenantId}/transformations';
export const CreateTransformationPath = '/api/v0/transformations';
export const GetTransformationPath =
  '/api/v0/media/transformations/{transformationId}';
export const UpdateTransformationPath =
  '/api/v0/media/transformations/{transformationId}';
export const DeleteTransformationPath =
  '/api/v0/media/transformations/{transformationId}';

export class ProtocolMediaTransformationsService {
  private protocol: ProtocolBackendClient;

  constructor(protocol: ProtocolBackendClient) {
    this.protocol = protocol;
  }

  list(
    options?: ListTransformationsOptions,
  ): Promise<ListTransformations200Response> {
    return this.protocol.client.request<ListTransformations200Response>(
      'GET',
      ListTransformationsPath,
      options,
    );
  }

  get(
    options?: GetTransformationOptions,
  ): Promise<GetTransformation200Response> {
    return this.protocol.client.request<GetTransformation200Response>(
      'GET',
      GetTransformationPath,
      options,
    );
  }

  create(
    options?: CreateTransformationOptions,
  ): Promise<CreateTransformation201Response> {
    return this.protocol.client.request<CreateTransformation201Response>(
      'POST',
      CreateTransformationPath,
      options,
    );
  }

  update(
    options?: UpdateTransformationOptions,
  ): Promise<GetTransformation200Response> {
    return this.protocol.client.request<GetTransformation200Response>(
      'PUT',
      UpdateTransformationPath,
      options,
    );
  }

  delete(
    options?: DeleteTransformationOptions,
  ): Promise<DeleteTransformation200Response> {
    return this.protocol.client.request<DeleteTransformation200Response>(
      'DELETE',
      DeleteTransformationPath,
      options,
    );
  }
}
