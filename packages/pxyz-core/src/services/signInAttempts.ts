import { Protocol } from "../pxyz";
import {
    AttemptSignInAttemptFirstFactorOptions,
    AttemptSignInAttemptSecondFactorOptions,
    CreateSignInAttemptOptions,
    GetSignInAttemptOptions,
    PrepareSignInAttemptFirstFactorOptions,
    PrepareSignInAttemptSecondFactorOptions,
    UpdateSignInAttemptOptions,
} from "../requests";
import {
    AttemptSignInAttemptFirstFactor200Response,
    AttemptSignInAttemptSecondFactor200Response,
    CreateSignInAttempt201Response,
    GetSignInAttempt200Response,
    PrepareSignInAttemptFirstFactor200Response,
    PrepareSignInAttemptSecondFactor200Response,
    UpdateSignInAttempt200Response,
} from "../responses";

export class ProtocolAuthSignInAttemptsService {
    private protocol: Protocol;

    constructor(protocolAuth: Protocol) {
        this.protocol = protocolAuth;
    }

    get(options?: GetSignInAttemptOptions): Promise<GetSignInAttempt200Response> {
        return this.protocol.client.request<GetSignInAttempt200Response>(
            "GET",
            "/api/auth/frontend/v0/sign-ins/{id}",
            options,
        );
    }

    create(options: CreateSignInAttemptOptions): Promise<CreateSignInAttempt201Response> {
        return this.protocol.client.request<CreateSignInAttempt201Response>(
            "POST",
            "/api/auth/frontend/v0/sign-ins",
            options,
        );
    }

    update(options: UpdateSignInAttemptOptions): Promise<UpdateSignInAttempt200Response> {
        return this.protocol.client.request<UpdateSignInAttempt200Response>(
            "PATCH",
            "/api/auth/frontend/v0/sign-ins/{id}",
            options,
        );
    }

    prepareFirstFactor(
        options: PrepareSignInAttemptFirstFactorOptions,
    ): Promise<PrepareSignInAttemptFirstFactor200Response> {
        return this.protocol.client.request<PrepareSignInAttemptFirstFactor200Response>(
            "POST",
            "/api/auth/frontend/v0/sign-ins/{id}/prepare-first-factor",
            options,
        );
    }

    attemptFirstFactor(
        options: AttemptSignInAttemptFirstFactorOptions,
    ): Promise<AttemptSignInAttemptFirstFactor200Response> {
        return this.protocol.client.request<AttemptSignInAttemptFirstFactor200Response>(
            "POST",
            "/api/auth/frontend/v0/sign-ins/{id}/attempt-first-factor",
            options,
        );
    }

    prepareSecondFactor(
        options: PrepareSignInAttemptSecondFactorOptions,
    ): Promise<PrepareSignInAttemptSecondFactor200Response> {
        return this.protocol.client.request<PrepareSignInAttemptSecondFactor200Response>(
            "POST",
            "/api/auth/frontend/v0/sign-ins/{id}/prepare-second-factor",
            options,
        );
    }

    attemptSecondFactor(
        options: AttemptSignInAttemptSecondFactorOptions,
    ): Promise<AttemptSignInAttemptSecondFactor200Response> {
        return this.protocol.client.request<AttemptSignInAttemptSecondFactor200Response>(
            "POST",
            "/api/auth/frontend/v0/sign-ins/{id}/attempt-second-factor",
            options,
        );
    }
}
