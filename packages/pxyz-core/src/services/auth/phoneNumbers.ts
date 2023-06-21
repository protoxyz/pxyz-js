import { Protocol } from "../../pxyz";
import {
    CreatePhoneNumberOptions,
    DeletePhoneNumberOptions,
    ListPhoneNumbersOptions,
    ResendPhoneNumberVerificationOptions,
    SetPhoneNumberPrimaryOptions,
    VerifyPhoneNumberOptions,
} from "../../requests";
import {
    CreatePhoneNumber201Response,
    DeletePhoneNumber200Response,
    ListPhoneNumbers200Response,
    ResendPhoneNumberVerification200Response,
    SetPhoneNumberPrimary200Response,
    VerifyPhoneNumber200Response,
} from "../../responses";

export const ListPhoneNumbersPath = "/api/auth/frontend/v0/user/phones";
export const CreatePhoneNumberPath = "/api/auth/frontend/v0/user/phones";
export const DeletePhoneNumberPath = "/api/auth/frontend/v0/user/phones/{phoneId}";
export const VerifyPhoneNumberPath = "/api/auth/frontend/v0/user/phones/{phoneId}/verify";
export const ResendPhoneNumberVerificationPath = "/api/auth/frontend/v0/user/phones/{phoneId}/resend";
export const SetPhoneNumberPrimaryPath = "/api/auth/frontend/v0/user/phones/{phoneId}/primary";

export class ProtocolAuthPhoneNumbersService {
    private protocol: Protocol;

    constructor(protocolAuth: Protocol) {
        this.protocol = protocolAuth;
    }

    list(options?: ListPhoneNumbersOptions): Promise<ListPhoneNumbers200Response> {
        return this.protocol.client.request<ListPhoneNumbers200Response>("GET", ListPhoneNumbersPath, options);
    }

    create(options?: CreatePhoneNumberOptions): Promise<CreatePhoneNumber201Response> {
        return this.protocol.client.request<CreatePhoneNumber201Response>("POST", CreatePhoneNumberPath, options);
    }

    delete(options?: DeletePhoneNumberOptions): Promise<DeletePhoneNumber200Response> {
        return this.protocol.client.request<DeletePhoneNumber200Response>("DELETE", DeletePhoneNumberPath, options);
    }

    verify(options?: VerifyPhoneNumberOptions): Promise<VerifyPhoneNumber200Response> {
        return this.protocol.client.request<VerifyPhoneNumber200Response>("POST", VerifyPhoneNumberPath, options);
    }

    resendVerification(
        options?: ResendPhoneNumberVerificationOptions,
    ): Promise<ResendPhoneNumberVerification200Response> {
        return this.protocol.client.request<ResendPhoneNumberVerification200Response>(
            "POST",
            ResendPhoneNumberVerificationPath,
            options,
        );
    }

    setPrimary(options?: SetPhoneNumberPrimaryOptions): Promise<SetPhoneNumberPrimary200Response> {
        return this.protocol.client.request<SetPhoneNumberPrimary200Response>(
            "POST",
            SetPhoneNumberPrimaryPath,
            options,
        );
    }
}
