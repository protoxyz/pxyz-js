import { useProtocolAuthLogout } from '../../../hooks/useProtocolAuthLogout';
import { Button, ButtonProps } from '../../ui/button';
import { Spinner } from '../../ui/spinner';

interface SignOutButtonProps {
  children?: React.ReactNode;
  text?: string;
  button?: ButtonProps;
}
export function SignOutButton({
  children,
  button,
  text = 'Sign out',
}: SignOutButtonProps) {
  const { logout, isLoggingOut } = useProtocolAuthLogout();

  if (children) {
    return (
      <div
        className="flex flex-1 items-center justify-between"
        onClick={isLoggingOut ? null : logout}
      >
        {isLoggingOut && <Spinner />}
        {!isLoggingOut && children}
      </div>
    );
  }

  return (
    <Button
      disabled={isLoggingOut}
      onClick={isLoggingOut ? null : logout}
      {...button}
      className="z-10"
    >
      {isLoggingOut && <Spinner color="white" />}
      {!isLoggingOut && text}
    </Button>
  );
}
