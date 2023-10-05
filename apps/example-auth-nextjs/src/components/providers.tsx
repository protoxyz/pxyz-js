'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}
