"use client";
import PodcastCard from "@/components/PodcastCard";
import { Button } from "@/components/ui/button";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const page = () => {
   const podcastData = useQuery(api.podcast.get);
  return (
    <div className="container p-0">

      <h1 className="font-bold text-xl mb-5">Trending Podcast</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 sm:gap-10">
        {podcastData?.map(
          ({
            author,
            podcastTitle,
            podcastDescription,
            audioUrl,
            audioStorageId,
          }) => (
            <PodcastCard
              key={audioStorageId}
              id={audioStorageId}
              title={podcastTitle}
              description={podcastDescription}
              audioUrl={audioUrl}
              author={author}
            />
          )
        )}
      </div>
    </div>
  );
};

export default page;
