import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import PodcastCard from "./PodcastCard";
import { any } from "zod";

const TrendingPodcast = () => {
      const podcastData = useQuery(api.podcast.get);
    return (
      <div>
        <h1 className="font-bold text-xl mb-5">Trending Podcast</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 ">
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
                id={audioStorageId as any}
                title={podcastTitle}
                description={podcastDescription}
                audioUrl={audioUrl as any}
                author={author as any}
              />
            )
          )}
        </div>
      </div>
    );
}

export default TrendingPodcast;