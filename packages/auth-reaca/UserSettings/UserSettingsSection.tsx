import { useProtocolAuth } from '@/providers/protocol';
import clsx from 'clsx';

export function UserSettingsSection({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  const { theme } = useProtocolAuth();

  return (
    <div className="col-span-full md:col-span-2">
      <h2
        className={clsx(
          'text-xl font-semibold leading-7 ',
          theme?.userSettingsHeadingColor,
        )}
      >
        {heading}
      </h2>
      <p
        className={clsx(
          'text-md mt-1 leading-6 ',
          theme?.userSettingsSubheadingColor,
        )}
      >
        {subheading}
      </p>
    </div>
  );
}
