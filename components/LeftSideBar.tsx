import Link from "next/link";

const LeftSideBar = () => {
  return (
    <section>
      <nav className="flex flex-col gap-2">
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/discover"}>Discover</Link>
      </nav>
    </section>
  );
};

export default LeftSideBar;
