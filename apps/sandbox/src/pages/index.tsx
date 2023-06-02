import { useProtocolAuth } from "@protoxyz/auth-react";
import { IsLoggedIn, IsLoggedOut } from "@protoxyz/auth-ui";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function Home() {
    const { user } = useProtocolAuth();
    return (
        <Layout>
            <IsLoggedIn>
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    hello
                    <code className="font-mono font-bold">{user?.firstName}</code>
                </p>
            </IsLoggedIn>

            <IsLoggedOut>
                <p className="fixed left-0 top-0 flex w-full justify-center gap-2 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    You are not logged in.{" "}
                    <Link href="/sign-in" className="text-violet-500">
                        Login
                    </Link>
                    or
                    <Link href="/sign-up" className="text-violet-500">
                        Sign up
                    </Link>
                    here.
                </p>
            </IsLoggedOut>
        </Layout>
    );
}
