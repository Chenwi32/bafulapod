import LeftSideBar from "@/components/LeftSideBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import RightSideBar from "@/components/RightSideBar";

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
      <body>
        <div className="container flex justify-between">
          <LeftSideBar />

          <section className="border-orange-400">
            <div>
              <div>
                <Image src={"/icons/logo1.svg"} width={40} height={50} alt="" />
                Mobile Nav
              </div>
              <div>
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
