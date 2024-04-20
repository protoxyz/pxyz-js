'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function SubmitButton({ children, action, ...props }: any) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="flex w-full items-center justify-between"
      {...props}
    >
      {pending ? 'Loading...' : children}
    </Button>
  );
}
