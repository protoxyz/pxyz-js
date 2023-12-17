import { Wrapper } from '@/components/wrapper';
import { SignIn } from '@protoxyz/components';

export default function SignInPage() {
  return (
    <Wrapper>
      <SignIn afterSignInRedirectUri="/" />
    </Wrapper>
  );
}
