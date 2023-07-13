import { AuthComponentType } from '@protoxyz/themes';
import {
  useProtocolAuthAppearance,
  useProtocolAuthInstance,
} from '../contexts/protocol-context';

export function useBrandName({ component }: { component: AuthComponentType }) {
  const { appearance } = useProtocolAuthAppearance({ component });
  const { instance } = useProtocolAuthInstance();

  return (
    appearance?.layout?.brandName ??
    instance?.brandingApplicationName ??
    'ProtoXYZ'
  );
}

export function useBrandLogo({ component }: { component: AuthComponentType }) {
  const { appearance } = useProtocolAuthAppearance({ component });
  const { instance } = useProtocolAuthInstance();

  return (
    appearance?.layout?.logoImageUrl ??
    instance?.brandingApplicationLogoUri ??
    null
  );
}
