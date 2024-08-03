import LeftSideBar from "@/components/LeftSideBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import RightSideBar from "@/components/RightSideBar";
import MobileNav from "@/components/MobileNav";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NativeLanPod",
  description: "Native Language Podcast Platform",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <ToastProvider>
        <body className="relative flex flex-col">
          <div>
            <div className=" bg-white z-10 py-2 px-5 shadow-lg fixed w-full mb-5">
              <Navbar />
            </div>

            <div className=" container p-0 sm:p-5 flex top-20 justify-between relative ">
              <div className="hidden lg:block">
                <LeftSideBar />
              </div>

              <section className=" flex flex-1 min-h-screen flex-col  px-1 sm:px-14">
                <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
                  <div className="flex flex-col py-10 md:pb-14">
                    <Toaster />

                    {children}
                  </div>
                </div>
              </section>

              <div className="hidden lg:block">
                <RightSideBar />
              </div>
            </div>
          </div>
        </body>
      </ToastProvider>
    </html>
  );
}
