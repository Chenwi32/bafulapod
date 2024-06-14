import LeftSideBar from "@/components/LeftSideBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import RightSideBar from "@/components/RightSideBar";
import MobileNav from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BafulaPod",
  description: "Bafut Language Podcast Platform",
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
    <html>
      <body className="relative flex flex-col">
        <div className="container flex justify-between relative ">
          <LeftSideBar />

          <section className=" flex flex-1 min-h-screen flex-col  px-4 sm:px-14">
            <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
              <div className="flex h-16 items-center justify-between md:hidden">
                <Image src={"/icons/logo1.svg"} width={40} height={50} alt="Menu Icon" />
              <MobileNav/>
              </div>
              <div className="flex flex-col md:pb-14">
                Toaster
                {children}
              </div>
            </div>
          </section>

          <RightSideBar />
        </div>
      </body>
    </html>
  );
}
