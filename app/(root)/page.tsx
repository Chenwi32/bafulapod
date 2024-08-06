"use client"
import Banner from "@/components/Banner";
import MobileBanner from "@/components/MobileBanner";
import TrendingPodcast from "@/components/TrendingPodcast";
import Head from "next/head";

const page = () => {
  return (
    <>
      <Head>
        <meta property="og:title" content="NiiLong" />
        <meta
          property="og:description"
          content="Stay Connected To Your Roots Wherever You Are In The World."
        />
        <meta property="og:image" content="/icons/image0.png" />
        <meta property="og:image:width" content="500px" />
        <meta property="og:image:height" content="350px" />
      </Head>
      <div className="container  max-w-none p-0">
        <div className="lg:hidden">
          <MobileBanner />
        </div>
        <div className="hidden lg:block">
          <Banner />
        </div>

        <TrendingPodcast />
      </div>
    </>
  );
};

export default page;
