import { Metadata } from "next";
import ConvexClientProvider from "./providers/ConvexClerkProvider";
import { Inter } from "next/font/google";
import ConvexClerkProvider from "./providers/ConvexClerkProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Niilong",
  description: "Native Language Podcast Platform",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClerkProvider>{children}</ConvexClerkProvider>
      </body>
    </html>
  );
}
