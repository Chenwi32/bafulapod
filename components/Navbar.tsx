"use client"
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "./ui/menubar";
import { cx } from "class-variance-authority";
import { sideBarLinks } from "@/constants";
import {usePathname, useRouter} from "next/navigation";

const Navbar = () => {
    const pathName = usePathname();
    const router = useRouter();
  return (
    <nav className="flex justify-between container p-0 items-center ">
      <Link href={"/"}>
        <Image src="/icons/logo.svg" width={50} alt="logo" height={50} />
      </Link>
      <div className="flex gap-5">
        <SignedOut>
          <Link href={"/sign-in"}>
            <Button className=" font-bold rounded text-slate-950 border-2 border-slate-950">
              Sign In
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button className="bg-orange-400 font-bold rounded text-white hover:bg-slate-950">
              Sign Up
            </Button>
          </Link>
        </SignedOut>

        <SignedIn> 
          <div className="flex gap-5">
            <Menubar className="border-none lg:hidden p-0">
              <MenubarMenu>
                <MenubarTrigger>
                  <MenuIcon />
                </MenubarTrigger>
                <MenubarContent className="bg-white">
                  {sideBarLinks.map((route) => {
                    const isActive =
                      pathName === route.route ||
                      pathName.startsWith(`${route}/`);
                    return (
                      <div className="pb-2 pl-4" key={route.label}>
                        <Link
                          className={cx("flex items-end p-2 gap-2 pr-2", {
                            " bg-slate-100 border-r-4 border-orange-400 font-extrabold":
                              isActive,
                          })}
                          href={route.route}
                        >
                          <MenubarItem>
                             <Image
                            src={route.ImageUrl}
                            alt="logo"
                            width={20}
                              height={20}
                              className="mr-2"
                          />
                          <span className="max-lg:"> {route.label}</span>
                          </MenubarItem>
                         
                        </Link>
                      </div>
                    );
                  })}
                  
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
