import LeftSideBar from "@/components/LeftSideBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Niilong",
  description: "Stay Connected To Your Roots Wherever You Are In The World.",
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
      <ToastProvider>
        <body className="relative ">
          
            <div className=" bg-white z-10 py-2 px-5 shadow-md fixed w-full mb-5">
              <Navbar />
            </div>

            <div className=" container p-0 sm:p-5 flex top-16 justify-between">
              <div className="hidden lg:block">
                <LeftSideBar />
              </div>

              <section className=" flex flex-1 min-h-screen flex-col  lg:px-1 ">
                <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
                  <div className="flex flex-col  md:pb-14">
                    <Toaster />

                    {children}
                  </div>
                </div>
              </section>

             
            
          </div>

           <div className="brand-1">
                <Footer/>
          </div> 
        </body>
      </ToastProvider>
    </html>
  );
}
