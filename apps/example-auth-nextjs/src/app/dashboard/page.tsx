import { Header } from '@/components/header';
import { JWTInfo } from '@/components/jwt-info';
import { UserInfo } from '@/components/user-info';
import { Wrapper } from '@/components/wrapper';
import { IsLoggedIn } from '@protoxyz/auth-react';
import { Uploader } from '@protoxyz/uploads-react';

export default function DashboardPage() {
  return (
    <Wrapper>
      <Header />
      <IsLoggedIn>You are signed in!</IsLoggedIn>

      <div className="grid grid-cols-4 gap-5">
        <UserInfo />
        <JWTInfo />

        <div className="border rounded-xl p-5">
          <h1 className="text-2xl font-bold">Upload Example</h1>
          <Uploader />
        </div>
      </div>
    </Wrapper>
  );
}
