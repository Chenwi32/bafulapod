import LeftSideBar from "@/components/LeftSideBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BafulaPod",
  description: "Bafut Language Podcast Platform",
  icons: {
    icon: "",
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
          <main>{children}</main>
          <p>Right Side Bar</p>
          </div>
          </body>
         
     
    </html>
  );
}
