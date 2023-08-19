export const Wrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="bg-background h-100 inline-flex min-h-screen w-full flex-col items-center justify-start py-24 gap-5">
      {children}
    </div>
  );
};
