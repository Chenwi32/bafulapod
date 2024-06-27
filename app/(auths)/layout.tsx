import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "BafulaPod",
  description: "Bafut Language Podcast Platform",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className=" relative h-screen w-full">
      <div className="bg-slate-600 absolute w-full">
        <Image src={"/icons/logo1.svg"} alt="" fill className="size-full" />
      </div>
      {children}
    </main>
  );
}
