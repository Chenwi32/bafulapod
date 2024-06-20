import Image from "next/image";

const PodcastCard = ({
  id,
  title,
  description,
  imgURL,
}: {
  id: number;
  title: string;
  description: string;
  imgURL: string;
}) => {
  return (
    <div className="cursor-pointer">
      <figure className="flex flex-col gap-2">
        <Image alt={title} width={200} height={200} src={imgURL} />
        <h1>{title}</h1> <h1>{description}</h1>
      </figure>
    </div>
  );
};

export default PodcastCard;
