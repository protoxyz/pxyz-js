import { useProtocolAuth } from '../../../contexts/protocol-context';

export interface IsLoadedProps {
  children?: React.ReactNode;
}
export function IsLoaded({ children }: IsLoadedProps) {
  
  const { loaded } = useProtocolAuth();
  console.log("IsLoaded" )
  console.log(loaded.toString())
  
  if (loaded !== true) {
    return null;
  }

  return <>{children}</>;
}
