import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import PodcastCard from "./PodcastCard";

const TrendingPodcast = () => {
      const podcastData = useQuery(api.podcast.get);
    return (
      <div className=" flex flex-col items-center">
        <div>
          <h1 className="font-bold text-xl mb-5">Trending Podcast</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 ">
          {podcastData?.map(
            ({
              author,
              podcastTitle,
              podcastDescription,
              audioUrl,
              imageUrl,
              audioStorageId,
            }) => {
              console.log(imageUrl)
              return (
              <PodcastCard
                key={audioStorageId}
                id={audioStorageId as any}
                title={podcastTitle}
                description={podcastDescription}
                audioUrl={audioUrl as any}
                imageUrl={imageUrl as string}
                author={author as any}
                
              />
            )}
          )}
        </div>
        </div>
        
      </div>
    );
}

export default TrendingPodcast;