import React from 'react';

export type HookReturnValues = {
  code: string | null;
  inputStates: InputState[];
  inputClass: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type InputState = {
  digit: string;
  setDigit: React.Dispatch<React.SetStateAction<string>>;
};

const useVerificationCode = (codeLength: number): HookReturnValues => {
  const [code, setCode] = React.useState<string | null>(null);
  const inputStates: InputState[] = [];
  const inputClass = 'code-digit'; // classname used to target the inputs

  for (let i = 0; i < codeLength; i++) {
    const [digit, setDigit] = React.useState<string>('');
    inputStates.push({ digit, setDigit });
  }

  // jumps to next empty input when code is entered in an input and jumps to previous input when code is deleted from an input
  const handleChange: HookReturnValues['handleChange'] = (e, index) => {
    const entry = e.target.value as string;
    console.log(':handleChange -> entry', entry);

    if (entry.length <= 1 && !Number.isNaN(entry)) {
      // set and limit code per input box to 1 digit
      inputStates[index]?.setDigit(e.target.value);

      if (entry.length === 1) {
        // move focus to next empty input box unless it's the last one,
        if (index < codeLength - 1) {
          console.log('moving to next index');
          const nextInput = document.querySelectorAll<HTMLInputElement>(
            `.${inputClass}`,
          )[index + 1];
          if (nextInput?.value === '') nextInput.focus();
        }
      } else if (entry.length === 0) {
        // user deleted a code, move focus to the previous input box
        const prevInput = document.querySelectorAll<HTMLInputElement>(
          `.${inputClass}`,
        )[index - 1];

        // focus if the element exists
        if (prevInput !== undefined) prevInput.focus();
      }
    } else return;
  };

  // prevents user from entering any of the characters below, because 'e' is seen by JS as a number
  const handleKeyDown: HookReturnValues['handleKeyDown'] = (e) =>
    ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

  // compile the complete code anytime the inputs change
  React.useEffect(() => {
    const finalCode = inputStates
      ?.map((input) => {
        return input.digit;
      })
      .join('');

    // provide the complete code only if it is complete
    if (finalCode.length === codeLength) {
      setCode(finalCode);
    } else setCode(null);
  }, [inputStates]);

  return { code, inputStates, inputClass, handleChange, handleKeyDown };
};

export default useVerificationCode;
