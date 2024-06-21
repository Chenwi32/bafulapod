"use client";
import PodcastCard from "@/components/PodcastCard";
import { Button } from "@/components/ui/button";
import { podcastData } from "@/constants";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const page = () => {
   const tasks = useQuery(api.tasks.get);
  return (
    <div className="container">
      <div className="grid grid-cols-3 gap-4">
        {podcastData.map(
          ({
            id,
            title,
            imgURL,
            description,
          }: {
            id: number;
            title: string;
            imgURL: string;
            description: string;
          }) => (
            <PodcastCard
              key={id}
              id={id}
              title={title}
              description={description}
              imgURL={imgURL}
            />
          )
        )}
      </div>

      <div className="text-bold text-3xl mt-10">
        {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
      </div>

      {/*       <h1 className="text-5xl font-bold">Home Page</h1>
      <Button className="text-white bg-orange-400">Button</Button> */}
    </div>
  );
};

export default page;
