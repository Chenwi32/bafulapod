"use client"
import Banner from "@/components/Banner";
import TrendingPodcast from "@/components/TrendingPodcast";
import Head from "next/head";

const page = () => {
  return (
    <>
      <Head>
        <meta property="og:title" content="Your Page Title" />
        <meta property="og:description" content="Your Page Description" />
        <meta property="og:image" content="/path/to/your/image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div className="container  max-w-none p-0">
        <Banner />
        <TrendingPodcast />
      </div>
    </>
  );
};

export default page;
