import { Protocol } from "../pxyz";
import {
    CreateEmailAddressOptions,
    DeleteEmailAddressOptions,
    ListEmailAddressesOptions,
    ResendEmailAddressVerificationOptions,
    SetEmailAddressPrimaryOptions,
    VerifyEmailAddressOptions,
} from "../requests";
import {
    CreateEmailAddress201Response,
    DeleteEmailAddress200Response,
    ListEmailAddresses200Response,
    ResendEmailAddressVerification200Response,
    SetEmailAddressPrimary200Response,
    VerifyEmailAddress200Response,
} from "../responses";

export class ProtocolAuthEmailAddresssService {
    private protocol: Protocol;

    constructor(protocolAuth: Protocol) {
        this.protocol = protocolAuth;
    }

    list(options?: ListEmailAddressesOptions): Promise<ListEmailAddresses200Response> {
        return this.protocol.client.request<ListEmailAddresses200Response>(
            "GET",
            "/api/auth/frontend/v0/user/emails",
            options,
        );
    }

    create(options?: CreateEmailAddressOptions): Promise<CreateEmailAddress201Response> {
        return this.protocol.client.request<CreateEmailAddress201Response>(
            "POST",
            "/api/auth/frontend/v0/user/emails",
            options,
        );
    }

    delete(options?: DeleteEmailAddressOptions): Promise<DeleteEmailAddress200Response> {
        return this.protocol.client.request<DeleteEmailAddress200Response>(
            "DELETE",
            "/api/auth/frontend/v0/user/emails/{emailId}",
            options,
        );
    }

    verify(options?: VerifyEmailAddressOptions): Promise<VerifyEmailAddress200Response> {
        return this.protocol.client.request<VerifyEmailAddress200Response>(
            "POST",
            "/api/auth/frontend/v0/user/emails/{emailId}/verify",
            options,
        );
    }

    resendVerification(
        options?: ResendEmailAddressVerificationOptions,
    ): Promise<ResendEmailAddressVerification200Response> {
        return this.protocol.client.request<ResendEmailAddressVerification200Response>(
            "POST",
            "/api/auth/frontend/v0/user/emails/{emailId}/resend",
            options,
        );
    }

    setPrimary(options?: SetEmailAddressPrimaryOptions): Promise<SetEmailAddressPrimary200Response> {
        return this.protocol.client.request<SetEmailAddressPrimary200Response>(
            "POST",
            "/api/auth/frontend/v0/user/emails/{emailId}/primary",
            options,
        );
    }
}
