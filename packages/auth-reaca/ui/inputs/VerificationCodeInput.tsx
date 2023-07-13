import clsx from 'clsx';
import { InputProps } from '@/types';
import { useProtocolAuth } from '@/providers/protocol';

export function VerificationInput(props: InputProps) {
  const { theme } = useProtocolAuth();

  return (
    <input
      {...props}
      id="code"
      name="code"
      type="number"
      autoComplete="one-time-code"
      inputMode="numeric"
      placeholder="Verification code"
      pattern="[0-9]*"
      required={true}
      autoFocus={true}
      className={clsx(
        clsx(
          'block w-full appearance-none',
          theme?.inputBgColor,
          theme?.inputBorder,
          theme?.inputBorderColor,
          theme?.inputBorderRadius,
          theme?.inputBoxShadow,
          theme?.inputPaddingHorizontal,
          theme?.inputPaddingVertical,
          theme?.inputText,
        ),
        // "focus:ring-secondary-500 block w-full appearance-none rounded-md border border-zinc-100 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm focus:outline-none sm:text-sm",
      )}
    />
  );
}
