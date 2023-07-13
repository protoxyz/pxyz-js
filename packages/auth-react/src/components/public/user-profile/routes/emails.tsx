import { AuthComponentType } from '@protoxyz/themes';

import {
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '../../../../contexts/protocol-context';
import { SectionHeader } from '../section-header';
import { Button } from '../../../ui/button';
import { useProtocolAuthEmailsList } from '../../../../hooks/useEmailsList';
import { Badge } from '../../../ui/badge';
import { PlusIcon } from 'lucide-react';

interface UserEmailsRouteOptions {}
export function UserEmailsRoute({}: UserEmailsRouteOptions) {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { user } = useProtocolAuth();
  const { emails } = useProtocolAuthEmailsList({});

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="Email Addresses"
        description="Manage the email addresses associated with your account."
      />
      {emails.data.map((email) => {
        const isPrimary = user.primaryEmailId === email.id;
        const isVerified = email.verifiedAt !== null;

        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium text-gray-900">
                {email.email}
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
        <span>Add Email Address</span>
      </Button>
    </div>
  );
}
