import {
  IsLoggedIn,
  IsLoggedOut,
  SignInButton,
  SignUpButton,
} from '@protoxyz/auth-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="bg-background h-100 relative flex min-h-screen flex-1 flex-col">
        <div className=" relative flex-1 items-center justify-between ">
          <div className="mx-auto flex h-screen flex-1 flex-grow flex-col justify-between p-24 lg:max-w-5xl">
            <div className="before:bg-gradient-radial after:bg-gradient-conic relative flex flex-col place-items-center gap-8 before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-['']     before:lg:h-[360px]">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://pxyz.dev?utm_source=create-pxyz-app&utm_medium=pxyz-auth-template&utm_campaign=create-pxyz-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/protocol-black@4x.png"
                  alt="Protocol Logo"
                  className="h-8 w-auto dark:invert"
                  width={1152}
                  height={224}
                  priority
                />
              </a>

              <IsLoggedIn>
                <div className="text-muted-foreground">Hello world.</div>
              </IsLoggedIn>

              <IsLoggedOut>
                <div className="text-muted-foreground relative">
                  You aren&apos;t logged in.{' '}
                  <Link
                    href="/sign-in"
                    className="text-blue-500 hover:underline"
                  >
                    Log in
                  </Link>{' '}
                  or{' '}
                  <Link
                    href="/sign-up"
                    className="text-blue-500 hover:underline"
                  >
                    Sign up
                  </Link>{' '}
                  here.
                </div>
                <div className="text-muted-foreground ">
                  Or use the dialog buttons:
                </div>
                <div className="flex items-center gap-3">
                  <SignInButton
                    mode="popup"
                    button={{
                      variant: 'secondary',
                      size: 'lg',
                    }}
                    afterSignInRedirectUri="/dashboard"
                  />{' '}
                  <span className="text-muted-foreground">or</span>{' '}
                  <SignUpButton
                    mode="popup"
                    button={{
                      variant: 'secondary',
                      size: 'lg',
                    }}
                    afterSignUpRedirectUri="/dashboard"
                  />
                </div>
              </IsLoggedOut>
            </div>

            <div className="mb-32 mt-auto grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
              <a
                href="https://docs.pxyz.dev?utm_source=create-pxyz-app&utm_medium=pxyz-auth-template&utm_campaign=create-pxyz-app"
                className="group flex flex-col items-start justify-center rounded-lg border border-transparent px-5 py-4  text-start transition-colors hover:border-gray-300 hover:bg-gray-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-center text-2xl font-semibold`}>
                  Docs{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Find in-depth information about Protocol SDK features and
                  APIs.
                </p>
              </a>

              <a
                href="https://pxyz.dev/templates?utm_source=create-pxyz-app&utm_medium=pxyz-auth-template&utm_campaign=create-pxyz-app"
                className="group flex flex-col items-start justify-center rounded-lg border border-transparent px-5  py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Templates{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Explore the Production templates.
                </p>
              </a>

              <a
                href="https://pxyz.dev/onboard?utm_source=create-pxyz-app&utm_medium=pxyz-auth-template&utm_campaign=create-pxyz-app"
                className="group flex flex-col items-start justify-center rounded-lg border border-transparent px-5 py-4  text-start transition-colors hover:border-gray-300 hover:bg-gray-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Deploy{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Instantly deploy your monorepo to the cloud with Protocol.
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
