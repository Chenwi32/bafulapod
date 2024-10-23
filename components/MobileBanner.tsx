import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const MobileBanner = () => {
  return (
    <div className="mb-20 text-center shadow-md flex justify-between  rounded-xl ">
      <div className="py-5 flex flex-col items-center">
        <h1 className="font-extrabold mb-5 text-orange-400 text-4xl sm:text-5xl">
          Niilong
        </h1>
        <h1 className="font-bold capitalize text-slate-950 text-3xl sm:text-4xl mb-5">
          Stay Connected to Your Roots <br />
          <span className="text-orange-400">wherever</span> you are in the
          World.
        </h1>
        <Image
          src={"/icons/image0.png"}
          alt="African in African wear with a radio in his hand"
          height={350}
          width={500}
          className="rounded-xl mb-5"
        />
        <p className="capitalize mb-5">
          News is delivered directly to you in your native language. no matter
          where you are, learn your native Language Stay informed on stories
          from home and stay connected to your roots.
        </p>
        <div className="flex gap-10 justify-center">
          <Link href={"/sign-in"}>
            <Button className=" bg-inherit font-bold rounded hover:bg-slate-950 hover:text-white text-slate-950 px-5 sm:w-32 border-2 border-slate-950">
              Sign In
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button className="bg-orange-400 sm:w-32 px-5 font-bold rounded text-white hover:bg-slate-950">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileBanner;
