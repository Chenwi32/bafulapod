import { sideBarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const LeftSideBar = () => {
  return (
    <section>
      <nav className="flex flex-col gap-3">
        <Link className="flex items-end gap-1" href={"/"}>
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />{" "}
          <span className="max-lg:hidden font-extrabold">BafuLaPod</span>
        </Link>
        {sideBarLinks.map((route) => {
          return (
            <Link className="flex items-end gap-1" href={route.route}>
              <Image src={route.ImageUrl} alt="logo" width={30} height={30} />{" "}
              {route.label}
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default LeftSideBar;
