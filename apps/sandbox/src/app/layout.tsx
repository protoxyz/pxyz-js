export default function RootLayout({ children }: { children: React.ReactElement }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
