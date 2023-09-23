import { PaginatedResult, Response } from '@/responses';
import { UserProfile } from '@protoxyz/types';

export type ListUsers200Response = PaginatedResult<UserProfile>;
export interface GetUser200Response extends Response {
  data: UserProfile;
}

export interface CreateUser201Response extends Response {
  data: UserProfile;
}

export interface UpdateUser200Response extends Response {
  data: UserProfile;
}
export interface DeleteUser200Response extends Response {
  data: UserProfile;
}
