import { Metadata } from "next";
import ConvexClientProvider from "./providers/ConvexClerkProvider";
import { Inter } from "next/font/google";
import ConvexClerkProvider from "./providers/ConvexClerkProvider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Niilong",
  description: "Stay Connected To Your Roots Wherever You Are In The World.",

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
      <Head>
        <meta property="og:title" content="NiiLong" />
        <meta
          property="og:description"
          content="Stay Connected To Your Roots Wherever You Are In The World."
        />
        <meta property="og:image" content="/icons/image0.png" />
        <meta property="og:image:width" content="500px" />
        <meta property="og:image:height" content="350px" />
      </Head>
      <body className={inter.className}>
        <ConvexClerkProvider>{children}</ConvexClerkProvider>
      </body>
    </html>
  );
}
