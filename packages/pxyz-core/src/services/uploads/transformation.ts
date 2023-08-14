import { Protocol } from '../../pxyz';
import {
  ListTransformationsOptions,
  CreateTransformationOptions,
  GetTransformationOptions,
  UpdateTransformationOptions,
  DeleteTransformationOptions,
} from '../../requests';
import {
  CreateTransformation201Response,
  DeleteTransformation200Response,
  GetTransformation200Response,
  ListTransformations200Response,
} from '../../responses';

export const ListTransformationsPath =
  '/api/transformations/v0/transformations';
export const CreateTransformationPath =
  '/api/transformations/v0/transformations';
export const GetTransformationPath =
  '/api/transformations/v0/transformations/{transformationId}';
export const UpdateTransformationPath =
  '/api/transformations/v0/transformations/{transformationId}';
export const DeleteTransformationPath =
  '/api/transformations/v0/transformations/{transformationId}';

export class ProtocolTransformationsService {
  private protocol: Protocol;

  constructor(protocol: Protocol) {
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
