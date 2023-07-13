import { useProtocolAuth } from '../providers/protocol';
import { Button } from '@/components/ui/Button';

export interface SignUpButtonProps {
  mode?: 'redirect' | 'popup';
  redirectUrl?: string;
  afterSignInUrl?: string;
  afterSignUpUrl?: string;
  children?: React.ReactNode;
}
export function SignUpButton({
  mode = 'redirect',
  redirectUrl,
  afterSignInUrl,
  afterSignUpUrl,
  children,
}: SignUpButtonProps) {
  const { openSignIn, redirectToSignIn } = useProtocolAuth();

  const onClick = async () => {
    if (mode === 'redirect') {
      redirectToSignIn({ redirectUrl, afterSignInUrl, afterSignUpUrl });
    } else {
      openSignIn({ redirectUrl, afterSignInUrl, afterSignUpUrl });
    }
  };

  if (children) {
    return <div onClick={onClick}>{children}</div>;
  }

  return (
    <Button type="button" onClick={onClick}>
      Sign in
    </Button>
  );
}
