import { SecurityTabSessions } from './SecurityTabSessions';

export function SecurityTabContent({ tab }: { tab: string }) {
  if (tab !== 'security') return null;

  return (
    <>
      <SecurityTabSessions />
    </>
  );
}
