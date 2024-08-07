import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
const Banner = () => {
  return (
    <div className="mb-20 shadow-md flex justify-between  rounded-xl ">
      <div className="p-5">
        <h1  className="font-extrabold mb-5 text-orange-400 text-5xl">
          Niilong
        </h1>
        <h1 className="font-bold capitalize text-slate-950 text-5xl mb-5">
          Stay Connected to Your Roots{" "}
          <span className="text-orange-400">wherever</span> you are in the
          World.
        </h1>
        <p className="capitalize mb-5">
          News is delivered directly to you in your native language. no matter
          where you are, learn your native Language Stay informed on stories
          from home and stay connected to your roots.
        </p>
        <div className="flex gap-5">
          <Link href={"/sign-in"}>
            <Button className=" w-40 font-bold rounded text-slate-950 border-2 border-slate-950">
              Sign In
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button className="bg-orange-400 w-40 font-bold rounded text-white hover:bg-slate-950">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

      <Image
        src={"/icons/image0.png"}
        alt="African in African wear with a radio in his hand"
        height={350}
        width={500}
        className="rounded-xl"
      />
    </div>
  );
};

export default Banner;
