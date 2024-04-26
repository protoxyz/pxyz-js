import { ProtocolAuthProvider } from '@protoxyz/auth-react';
import './globals.css';
import type { AuthAppearance } from '@protoxyz/themes';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Protocol Auth Demo',
  description:
    'A demo of all the functionality in the Protocol Auth client SDKs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const appearance: AuthAppearance = {
    layout: {
      logoImageUrl: './protocol-black@4x.png',
      helpUrl: 'https://pxyz.dev/help',
      tosUrl: 'https://pxyz.dev/terms',
      privacyPolicyUrl: 'https://pxyz.dev/privacy',
    },
  };

  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} bg-muted`}>
        <ProtocolAuthProvider appearance={appearance}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </ProtocolAuthProvider>
      </body>
    </html>
  );
}
