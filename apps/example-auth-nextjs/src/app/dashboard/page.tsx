import { Header } from '@/components/header';
import { Wrapper } from '@/components/wrapper';
import { IsLoggedIn } from '@protoxyz/auth-react';
import { Uploader } from '@protoxyz/uploads-nextjs';

export default function DashboardPage() {
  return (
    <Wrapper>
      <Header />
      <IsLoggedIn>You are signed in!</IsLoggedIn>

      <div className="w-full max-w-lg mx-auto mt-24">
        <Uploader />
      </div>
    </Wrapper>
  );
}
