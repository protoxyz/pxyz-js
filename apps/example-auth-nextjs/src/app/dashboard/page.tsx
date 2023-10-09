import { Header } from '@/components/header';
import { ImageUploaderPreview } from '@/components/image-uploader-preview';
import { AvatarUploader } from '@protoxyz/components';
import { JWTInfo } from '@/components/jwt-info';
import { UserInfo } from '@/components/user-info';
import { Wrapper } from '@/components/wrapper';
// import { IsLoggedIn } from '@protoxyz/components';≈

export default function DashboardPage() {
  return (
    <Wrapper>
      <Header />
      {/* <IsLoggedIn>You are signed in!</IsLoggedIn> */}

      <div className="grid grid-cols-4 gap-5">
        <UserInfo />
        <JWTInfo />

        <ImageUploaderPreview />
        <AvatarUploader initials="EC" />
      </div>
    </Wrapper>
  );
}
