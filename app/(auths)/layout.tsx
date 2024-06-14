import { ReadonlyURLSearchParams } from "next/navigation";

export default function AuthLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}