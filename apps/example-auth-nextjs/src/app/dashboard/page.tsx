import { Header } from '@/components/header';
import { Wrapper } from '@/components/wrapper';
import { IsLoggedIn } from '@protoxyz/auth-react';

export default function DashboardPage() {
  return (
    <Wrapper>
      <Header />
      <IsLoggedIn>You are signed in!</IsLoggedIn>
    </Wrapper>
  );
}
