import clsx from 'clsx';
import {
  ITimezoneOption,
  TimezoneSelectOptions,
  useTimezoneSelect,
} from 'react-timezone-select';
import { useProtocolAuth } from '@/providers/protocol';

type NativeSelectTimezoneProps = {
  value: string | ITimezoneOption;
  selectOptions: TimezoneSelectOptions;
  onChange: (timezone: ITimezoneOption) => void;
  className?: string;
};

export function NativeSelectTimezone({
  selectOptions,
  className,
  value,
  onChange,
}: NativeSelectTimezoneProps) {
  const { options, parseTimezone } = useTimezoneSelect(selectOptions);
  const { theme } = useProtocolAuth();
  return (
    <select
      name="timezone"
      id="timezone"
      value={parseTimezone(value).value}
      onChange={(e) => onChange(parseTimezone(e.currentTarget.value))}
      className={clsx(
        className,
        theme?.inputBgColor,
        theme?.inputBorder,
        theme?.inputBorderColor,
        theme?.inputBorderRadius,
        theme?.inputBoxShadow,
        theme?.inputPaddingHorizontal,
        theme?.inputPaddingVertical,
        theme?.inputText,
      )}
    >
      {options?.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}
