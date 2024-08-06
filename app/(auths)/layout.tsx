import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Niilong",
  description: "Stay Connected To Your Roots Wherever You Are In The World",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
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
      <main className="relative h-screen w-full">
        <div className=" z-0 absolute size-full">
          <Image src={"/icons/logo1.svg"} alt="" fill className="size-full" />
        </div>
        {children}
      </main>
    </>
  );
}
