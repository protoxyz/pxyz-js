import { Protocol } from "../pxyz";
import {
    CreatePhoneNumberOptions,
    DeletePhoneNumberOptions,
    ListPhoneNumbersOptions,
    ResendPhoneNumberVerificationOptions,
    SetPhoneNumberPrimaryOptions,
    VerifyPhoneNumberOptions,
} from "../requests";
import {
    CreatePhoneNumber201Response,
    DeletePhoneNumber200Response,
    ListPhoneNumbers200Response,
    ResendPhoneNumberVerification200Response,
    SetPhoneNumberPrimary200Response,
    VerifyPhoneNumber200Response,
} from "../responses";

export class ProtocolAuthPhoneNumbersService {
    private protocol: Protocol;

    constructor(protocolAuth: Protocol) {
        this.protocol = protocolAuth;
    }

    list(options?: ListPhoneNumbersOptions): Promise<ListPhoneNumbers200Response> {
        return this.protocol.client.request<ListPhoneNumbers200Response>(
            "GET",
            "/api/auth/frontend/v0/user/phones",
            options,
        );
    }

    create(options?: CreatePhoneNumberOptions): Promise<CreatePhoneNumber201Response> {
        return this.protocol.client.request<CreatePhoneNumber201Response>(
            "POST",
            "/api/auth/frontend/v0/user/phones",
            options,
        );
    }

    delete(options?: DeletePhoneNumberOptions): Promise<DeletePhoneNumber200Response> {
        return this.protocol.client.request<DeletePhoneNumber200Response>(
            "DELETE",
            "/api/auth/frontend/v0/user/phones/{phoneId}",
            options,
        );
    }

    verify(options?: VerifyPhoneNumberOptions): Promise<VerifyPhoneNumber200Response> {
        return this.protocol.client.request<VerifyPhoneNumber200Response>(
            "POST",
            "/api/auth/frontend/v0/user/phones/{phoneId}/verify",
            options,
        );
    }

    resendVerification(
        options?: ResendPhoneNumberVerificationOptions,
    ): Promise<ResendPhoneNumberVerification200Response> {
        return this.protocol.client.request<ResendPhoneNumberVerification200Response>(
            "POST",
            "/api/auth/frontend/v0/user/phones/{phoneId}/resend",
            options,
        );
    }

    setPrimary(options?: SetPhoneNumberPrimaryOptions): Promise<SetPhoneNumberPrimary200Response> {
        return this.protocol.client.request<SetPhoneNumberPrimary200Response>(
            "POST",
            "/api/auth/frontend/v0/user/phones/{phoneId}/primary",
            options,
        );
    }
}
