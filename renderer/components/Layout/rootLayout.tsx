'use client'
export default function RootLayout({
        children,
    }: {children: React.ReactNode}
) {
    return (
        <main>
            <br/> 
            {children}
            <br/>
        </main>
    );
};