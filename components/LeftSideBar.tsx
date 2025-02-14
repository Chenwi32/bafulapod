"use client";
import { sideBarLinks } from "@/constants";
import { cx } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";

const LeftSideBar = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <SignedIn>
      <section className=" hidden sm:block ">
        <nav className=" flex flex-col">
          <Link className="flex items-end  p-2 gap-2 " href={"/"}>
            <Image src="/icons/logo1.svg" width={30} height={30} alt="logo" />{" "}
            <span className=" font-extrabold">Niilong</span>
          </Link>
          {sideBarLinks.map((route) => {
            const isActive =
              pathName === route.route || pathName.startsWith(`${route}/`);
            return (
              <div className="pb-2 pl-4" key={route.label}>
                <Link
                  className={cx("flex items-end p-2 gap-2 pr-2", {
                    " bg-slate-100 border-r-4 border-orange-400 font-extrabold":
                      isActive,
                  })}
                  href={route.route}
                >
                  <Image
                    src={route.ImageUrl}
                    alt="logo"
                    width={20}
                    height={20}
                  />
                  <span className="max-lg:hidden"> {route.label}</span>
                </Link>
              </div>
            );
          })}
        </nav>
      </section>
    </SignedIn>
  );
};

export default LeftSideBar;
