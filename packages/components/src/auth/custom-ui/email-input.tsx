import { AuthComponentType } from '@protoxyz/themes';
import { useProtocolAuthTenant } from '@protoxyz/auth-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

import React from 'react';

interface EmailInputProps {
  setFirstFactorMethod: (method: 'email' | 'phone') => void;
  component: AuthComponentType;
}

export function EmailInput({
  setFirstFactorMethod,
  component,
}: EmailInputProps) {
  const { tenant } = useProtocolAuthTenant();

  return (
    <div className="pxyz-auth-email-input-wrapper grid gap-2">
      <div className="pxyz-auth-email-input-label-wrapper flex items-center justify-between">
        <Label htmlFor="email">Email Address</Label>
        {component === 'signIn' && tenant?.auth?.phoneSignInEnabled && (
          <Button variant="link" onClick={() => setFirstFactorMethod('phone')}>
            Use phone number
          </Button>
        )}
      </div>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="pxyz-auth-email-input"
      />
    </div>
  );
}
