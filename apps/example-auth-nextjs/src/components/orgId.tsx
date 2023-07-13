'use client';
import { useProtocolAuth } from '@protoxyz/auth-react';

const OrgId = () => {
  const { orgId } = useProtocolAuth();

  return <div>orgId: {orgId}</div>;
};

export default OrgId;
