import clsx from 'clsx';
import ReactPhoneInput2 from 'react-phone-input-2';
import { InputProps } from '@/types';
import { useProtocolAuth } from '@/providers/protocol';
// import "react-phone-input-2/lib/style.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ReactPhoneInput = ReactPhoneInput2.default
  ? ReactPhoneInput2.default
  : ReactPhoneInput2;

interface PhoneInputProps extends InputProps {
  required?: boolean;
}
export function PhoneInput({ required }: PhoneInputProps) {
  const { theme } = useProtocolAuth();
  return (
    <ReactPhoneInput
      country={'us'}
      containerClass={clsx(
        'flex w-full appearance-none ',
        theme?.inputBgColor,
        theme?.inputBorder,
        theme?.inputBorderColor,
        theme?.inputBorderRadius,
        theme?.inputBoxShadow,
      )}
      inputClass={clsx(
        ' flex w-full bg-transparent',
        theme?.inputBorder,
        theme?.inputBorderColor,
        theme?.inputBorderRadius,
        theme?.inputBoxShadow,
        theme?.inputPaddingHorizontal,
        theme?.inputPaddingVertical,
        theme?.inputText,
      )}
      inputProps={{
        name: 'phone',
        required: required,
      }}
      buttonClass={clsx('border-none', theme.inputBgColor)}
    />
  );
}
