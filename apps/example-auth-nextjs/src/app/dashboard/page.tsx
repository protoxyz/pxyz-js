import { Header } from '@/components/header';
import Upload from '@/components/upload';
import { Wrapper } from '@/components/wrapper';
import { IsLoggedIn } from '@protoxyz/auth-react';

export default function DashboardPage() {
  return (
    <Wrapper>
      <Header />
      <IsLoggedIn>You are signed in!</IsLoggedIn>

      <div className="w-full max-w-lg mx-auto mt-24">
        <Upload />
      </div>
    </Wrapper>
  );
}
