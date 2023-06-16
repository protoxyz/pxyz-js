import { IsLoggedIn, IsLoggedOut } from "@protoxyz/auth-ui";

export default function HomePage() {
    return (
        <>
            <IsLoggedIn>hi!</IsLoggedIn>
            <IsLoggedOut>You're not logged in!</IsLoggedOut>
        </>
    );
}
