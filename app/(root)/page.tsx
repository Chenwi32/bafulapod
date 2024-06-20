import PodcastCard from "@/components/PodcastCard";
import { Button } from "@/components/ui/button";
import { podcastData } from "@/constants";

const page = () => {
  return (
    <div className="container">
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

      <h1 className="text-5xl font-bold">Home Page</h1>
      <Button className="text-white bg-orange-400">Button</Button>
    </div>
  );
};

export default page;
