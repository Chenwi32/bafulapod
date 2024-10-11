import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="container mt-10 text-slate-950 min-h-20 relative p-5">
      <h1 className="font-bold mb-10 text-orange-400 text-xl sm:text-2xl bg-white w-fit p-2 pr-10 sm:pr-20 rounded">
        Niilong
      </h1>

      <div className="flex flex-col ">
        <p className="text-sm font-bold">&copy; 2024 Niilong </p>
      </div>

      <Link href="#up" className="fixed top-3/4 right-10">
        <Button className="border bg-inherit border-slate-950 text-slate-950 p-2 rounded-full absolute top-5 right-5">
          <ArrowUp />
        </Button>
      </Link>
    </div>
  );
};

export default Footer;
