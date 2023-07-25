import { AuthComponentType } from '@protoxyz/themes';
import {
  useProtocolAuthAppearance,
  useProtocolAuthTenant,
} from '../contexts/protocol-context';

export function useBrandName({ component }: { component: AuthComponentType }) {
  const { appearance } = useProtocolAuthAppearance({ component });
  const { tenant } = useProtocolAuthTenant();

  return appearance?.layout?.brandName ?? tenant?.name ?? 'ProtoXYZ';
}

export function useBrandLogo({ component }: { component: AuthComponentType }) {
  const { appearance } = useProtocolAuthAppearance({ component });
  const { tenant } = useProtocolAuthTenant();

  return appearance?.layout?.logoImageUrl ?? tenant?.imageUri ?? null;
}
