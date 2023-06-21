import { Protocol } from "../../pxyz";
import {
    AttemptSignUpAttemptVerificationOptions,
    CreateSignUpAttemptOptions,
    GetSignUpAttemptOptions,
    PrepareSignUpAttemptVerificationOptions,
    UpdateSignUpAttemptOptions,
} from "../../requests";
import {
    AttemptSignUpAttemptVerification200Response,
    CreateSignUpAttempt201Response,
    GetSignUpAttempt200Response,
    PrepareSignUpAttemptVerification200Response,
    UpdateSignUpAttempt200Response,
} from "../../responses";

export const CreateSignUpAttemptPath = "/api/auth/frontend/v0/sign-ups";
export const GetSignUpAttemptPath = "/api/auth/frontend/v0/sign-ups/{id}";
export const UpdateSignUpAttemptPath = "/api/auth/frontend/v0/sign-ups/{id}";
export const PrepareSignUpAttemptVerificationPath = "/api/auth/frontend/v0/sign-ups/{id}/prepare-verification";
export const AttemptSignUpAttemptVerificationPath = "/api/auth/frontend/v0/sign-ups/{id}/attempt-verification";

export class ProtocolAuthSignUpAttemptsService {
    private protocol: Protocol;

    constructor(protocol: Protocol) {
        this.protocol = protocol;
    }

    create(options?: CreateSignUpAttemptOptions): Promise<CreateSignUpAttempt201Response> {
        return this.protocol.client.request<CreateSignUpAttempt201Response>("POST", CreateSignUpAttemptPath, options);
    }

    get(options?: GetSignUpAttemptOptions): Promise<GetSignUpAttempt200Response> {
        return this.protocol.client.request<GetSignUpAttempt200Response>("GET", GetSignUpAttemptPath, options);
    }

    update(options: UpdateSignUpAttemptOptions): Promise<UpdateSignUpAttempt200Response> {
        return this.protocol.client.request<UpdateSignUpAttempt200Response>("PATCH", UpdateSignUpAttemptPath, options);
    }

    prepareVerification(
        options: PrepareSignUpAttemptVerificationOptions,
    ): Promise<PrepareSignUpAttemptVerification200Response> {
        return this.protocol.client.request<PrepareSignUpAttemptVerification200Response>(
            "POST",
            PrepareSignUpAttemptVerificationPath,
            options,
        );
    }

    attemptVerification(
        options: AttemptSignUpAttemptVerificationOptions,
    ): Promise<AttemptSignUpAttemptVerification200Response> {
        return this.protocol.client.request<AttemptSignUpAttemptVerification200Response>(
            "POST",
            AttemptSignUpAttemptVerificationPath,
            options,
        );
    }
}
