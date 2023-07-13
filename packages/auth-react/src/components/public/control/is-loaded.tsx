import { useProtocolAuth } from '../../../contexts/protocol-context';

export interface IsLoadedProps {
  children?: React.ReactNode;
}
export function IsLoaded({ children }: IsLoadedProps) {
  const { loaded } = useProtocolAuth();

  if (loaded !== true) {
    return null;
  }

  return <>{children}</>;
}
