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
        <Image
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
          alt={title}
          width={200}
          height={200}
          src={imgURL}
        />
        <h1 className="text-xl font-bold truncate">{title}</h1>
        <h1 className="text-12 capitalize truncate">{description}</h1>
      </figure>
    </div>
  );
};

export default PodcastCard;
