import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthStatsSignUpsByDayResponse = {
    date: string  
    count: number 
}[]
export type AuthStatsSignUpsByDayInput = undefined;
export function signUpsByDay(
    auth: AuthOptions,
    body?: AuthStatsSignUpsByDayInput,
    options?: RequestOptions<AuthStatsSignUpsByDayInput>,
    development?: boolean,
): Promise<AuthStatsSignUpsByDayResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthStatsSignUpsByDayInput, AuthStatsSignUpsByDayResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/stats/sign-ups-by-day',
      options,
  );
}

