import { Protocol } from "../../pxyz";
import {
    AttemptSignInAttemptFirstFactorOptions,
    AttemptSignInAttemptSecondFactorOptions,
    CreateSignInAttemptOptions,
    GetSignInAttemptOptions,
    PrepareSignInAttemptFirstFactorOptions,
    PrepareSignInAttemptSecondFactorOptions,
    UpdateSignInAttemptOptions,
} from "../../requests";
import {
    AttemptSignInAttemptFirstFactor200Response,
    AttemptSignInAttemptSecondFactor200Response,
    CreateSignInAttempt201Response,
    GetSignInAttempt200Response,
    PrepareSignInAttemptFirstFactor200Response,
    PrepareSignInAttemptSecondFactor200Response,
    UpdateSignInAttempt200Response,
} from "../../responses";

export const GetSignInAttemptPath = "/api/auth/frontend/v0/sign-ins/{id}";
export const CreateSignInAttemptPath = "/api/auth/frontend/v0/sign-ins";
export const UpdateSignInAttemptPath = "/api/auth/frontend/v0/sign-ins/{id}";
export const PrepareSignInAttemptFirstFactorPath = "/api/auth/frontend/v0/sign-ins/{id}/prepare-first-factor";
export const AttemptSignInAttemptFirstFactorPath = "/api/auth/frontend/v0/sign-ins/{id}/attempt-first-factor";
export const PrepareSignInAttemptSecondFactorPath = "/api/auth/frontend/v0/sign-ins/{id}/prepare-second-factor";
export const AttemptSignInAttemptSecondFactorPath = "/api/auth/frontend/v0/sign-ins/{id}/attempt-second-factor";

export class ProtocolAuthSignInAttemptsService {
    private protocol: Protocol;

    constructor(protocolAuth: Protocol) {
        this.protocol = protocolAuth;
    }

    get(options?: GetSignInAttemptOptions): Promise<GetSignInAttempt200Response> {
        return this.protocol.client.request<GetSignInAttempt200Response>("GET", GetSignInAttemptPath, options);
    }

    create(options: CreateSignInAttemptOptions): Promise<CreateSignInAttempt201Response> {
        return this.protocol.client.request<CreateSignInAttempt201Response>("POST", CreateSignInAttemptPath, options);
    }

    update(options: UpdateSignInAttemptOptions): Promise<UpdateSignInAttempt200Response> {
        return this.protocol.client.request<UpdateSignInAttempt200Response>("PATCH", UpdateSignInAttemptPath, options);
    }

    prepareFirstFactor(
        options: PrepareSignInAttemptFirstFactorOptions,
    ): Promise<PrepareSignInAttemptFirstFactor200Response> {
        return this.protocol.client.request<PrepareSignInAttemptFirstFactor200Response>(
            "POST",
            PrepareSignInAttemptFirstFactorPath,
            options,
        );
    }

    attemptFirstFactor(
        options: AttemptSignInAttemptFirstFactorOptions,
    ): Promise<AttemptSignInAttemptFirstFactor200Response> {
        return this.protocol.client.request<AttemptSignInAttemptFirstFactor200Response>(
            "POST",
            AttemptSignInAttemptFirstFactorPath,
            options,
        );
    }

    prepareSecondFactor(
        options: PrepareSignInAttemptSecondFactorOptions,
    ): Promise<PrepareSignInAttemptSecondFactor200Response> {
        return this.protocol.client.request<PrepareSignInAttemptSecondFactor200Response>(
            "POST",
            PrepareSignInAttemptSecondFactorPath,
            options,
        );
    }

    attemptSecondFactor(
        options: AttemptSignInAttemptSecondFactorOptions,
    ): Promise<AttemptSignInAttemptSecondFactor200Response> {
        return this.protocol.client.request<AttemptSignInAttemptSecondFactor200Response>(
            "POST",
            AttemptSignInAttemptSecondFactorPath,
            options,
        );
    }
}
