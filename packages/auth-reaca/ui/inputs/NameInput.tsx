import clsx from 'clsx';
import { Label } from './Label';
import { useProtocolAuth } from '@/providers/protocol';
import { InputProps } from '@/types';

interface NameInputProps extends InputProps {
  required?: boolean;
}
export function NameInput({ required, ...props }: NameInputProps) {
  const { theme } = useProtocolAuth();

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div>
        <Label htmlFor="name" label="Name" required={required} />

        <div className="mt-1">
          <input
            {...props}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required={required}
            className={clsx(
              'block w-full',
              theme?.inputBgColor,
              theme?.inputBorder,
              theme?.inputBorderColor,
              theme?.inputBorderRadius,
              theme?.inputBoxShadow,
              theme?.inputPaddingHorizontal,
              theme?.inputPaddingVertical,
              theme?.inputText,
            )}
          />
        </div>
      </div>
    </div>
  );
}
