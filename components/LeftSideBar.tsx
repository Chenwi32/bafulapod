"use client";
import { sideBarLinks } from "@/constants";
import { cx } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";



const LeftSideBar = () => {
  const pathName = usePathname()
  const router = useRouter()
  
  return (
    <section>
      <nav className="flex flex-col gap-3">
        <Link className="flex items-end p-2 gap-2" href={"/"}>
          <Image src="/icons/logo1.svg" width={30} height={30} alt="logo" />{" "}
          <span className="max-lg:hidden font-extrabold">BafuLaPod</span>
        </Link>
        {sideBarLinks.map((route) => {
          const isActive =
            pathName === route.route || pathName.startsWith(`${route}/`);
          return (
            <Link
              key={route.label}
              className={cx("flex items-end p-2 gap-2 pr-10", {
                " bg-slate-100 border-r-4 border-orange-400 font-extrabold":
                  isActive,
              })}
              href={route.route}
            >
              <Image src={route.ImageUrl} alt="logo" width={20} height={20} />
              <span className="max-lg:hidden"> {route.label}</span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default LeftSideBar;
