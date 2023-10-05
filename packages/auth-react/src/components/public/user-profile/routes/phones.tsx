import { AuthComponentType } from '@protoxyz/themes';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '../../../../contexts/protocol-context';
import { useProtocolAuthPhonesList } from '../../../../hooks/usePhonesList';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { PlusIcon } from 'lucide-react';
import { SectionHeader } from '../../../custom-ui/section-header';

interface UserPhonesRouteOptions {}
export function UserPhonesRoute({}: UserPhonesRouteOptions) {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { user } = useProtocolAuth();
  const { phones } = useProtocolAuthPhonesList({});

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="Phone Numbers"
        description="Manage the phone numbers associated with your account."
      />
      {phones?.data?.map((phone) => {
        const isPrimary = user.primaryPhoneId === phone.id;
        const isVerified = phone.verifiedAt !== null;

        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-foreground text-sm font-medium">
                {phone.phone}
              </div>
              {isVerified && <Badge>verified</Badge>}
              {!isVerified && <Badge>unverified</Badge>}
            </div>
            <div className="flex items-center">
              {!isPrimary && (
                <Button size="sm" variant="secondary">
                  Make Primary
                </Button>
              )}
              {!isPrimary && (
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              )}
            </div>
          </div>
        );
      })}
      <Button variant="outline">
        <PlusIcon className="h-5 w-5" />
        <span>Add Phone Number</span>
      </Button>
    </div>
  );
}
