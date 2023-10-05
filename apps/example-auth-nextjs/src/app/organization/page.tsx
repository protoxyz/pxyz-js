import { Wrapper } from '@/components/wrapper';
import { OrganizationProfile } from '@protoxyz/auth-react';
// import OrgId from '../../components/orgId';

export default function SignInPage() {
  return (
    <Wrapper>
      {/* <OrgId /> */}
      <OrganizationProfile />
    </Wrapper>
  );
}
