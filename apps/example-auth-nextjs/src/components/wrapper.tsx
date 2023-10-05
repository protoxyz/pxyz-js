export const Wrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className=" h-100 inline-flex min-h-screen w-full flex-col items-center justify-start gap-5 py-24">
      {children}
    </div>
  );
};
