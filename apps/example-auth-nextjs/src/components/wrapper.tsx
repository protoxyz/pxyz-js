export function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
        <div className="bg-background h-100 inline-flex min-h-screen w-full flex-col items-center justify-start py-24">
            {children}
        </div>
    );
}
