import { useProtocolAuthLogout } from '@protoxyz/auth-react';
import { Button } from 'react-native';

export default function SignOutButton() {
  const { logout } = useProtocolAuthLogout();

  return <Button onPress={() => logout()} title="Sign Out" />;
}
