export interface SessionUser {
    id: string;
    sessionId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    emailVerified: boolean;
    phone: string;
    phoneVerified: boolean;
    image: string;
    timezone: string;
    locale: string;
}
