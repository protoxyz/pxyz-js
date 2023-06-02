import { Protocol } from "../pxyz";
import {
    AttemptSignUpAttemptVerificationOptions,
    CreateSignUpAttemptOptions,
    GetSignUpAttemptOptions,
    PrepareSignUpAttemptVerificationOptions,
    UpdateSignUpAttemptOptions,
} from "../requests";
import {
    AttemptSignUpAttemptVerification200Response,
    CreateSignUpAttempt201Response,
    GetSignUpAttempt200Response,
    PrepareSignUpAttemptVerification200Response,
    UpdateSignUpAttempt200Response,
} from "../responses";

export class ProtocolAuthSignUpAttemptsService {
    private protocol: Protocol;

    constructor(protocol: Protocol) {
        this.protocol = protocol;
    }

    create(options?: CreateSignUpAttemptOptions): Promise<CreateSignUpAttempt201Response> {
        return this.protocol.client.request<CreateSignUpAttempt201Response>(
            "POST",
            "/api/auth/frontend/v0/sign-ups",
            options,
        );
    }

    get(options?: GetSignUpAttemptOptions): Promise<GetSignUpAttempt200Response> {
        return this.protocol.client.request<GetSignUpAttempt200Response>(
            "GET",
            "/api/auth/frontend/v0/sign-ups/{id}",
            options,
        );
    }

    update(options: UpdateSignUpAttemptOptions): Promise<UpdateSignUpAttempt200Response> {
        return this.protocol.client.request<UpdateSignUpAttempt200Response>(
            "PATCH",
            "/api/auth/frontend/v0/sign-ups/{id}",
            options,
        );
    }

    prepareVerification(
        options: PrepareSignUpAttemptVerificationOptions,
    ): Promise<PrepareSignUpAttemptVerification200Response> {
        return this.protocol.client.request<PrepareSignUpAttemptVerification200Response>(
            "POST",
            "/api/auth/frontend/v0/sign-ups/{id}/prepare-verification",
            options,
        );
    }

    attemptVerification(
        options: AttemptSignUpAttemptVerificationOptions,
    ): Promise<AttemptSignUpAttemptVerification200Response> {
        return this.protocol.client.request<AttemptSignUpAttemptVerification200Response>(
            "POST",
            "/api/auth/frontend/v0/sign-ups/{id}/attempt-verification",
            options,
        );
    }
}
