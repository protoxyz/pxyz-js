import { ProtocolAuthProvider } from '@protoxyz/auth-nextjs';
import './globals.css';
import type { AuthAppearance } from '@protoxyz/themes';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';

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
      logoImageUrl: './logo-black@3x.png',
      helpUrl: 'https://pxyz.dev/help',
      tosUrl: 'https://pxyz.dev/terms',
      privacyPolicyUrl: 'https://pxyz.dev/privacy',
    },

    elements: { card: 'bg-white border-2  ' },

    variables: {
      primary: '#858DFF',
      radius: '5rem',
    },
  };

  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        {/* @ts-ignore */}
        <ProtocolAuthProvider>
          <Header />
          {children}
        </ProtocolAuthProvider>
      </body>
    </html>
  );
}
