import Image from "next/image";

const PodcastCard = ({
  id,
  title,
  description,
  audioUrl,
  author,
}: {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  author: string;
}) => {
  return (
    <div className="bg-slate-200 shadow-lg p-5  w-full rounded">
      <figure className="flex w-full justify-center flex-col gap-2">
        {/* <Image
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
          alt={title}
          width={200}
          height={200}
          src={imgURL}
        /> */}
        <audio className="w-auto text-3" src={audioUrl} controls />

        <h1 className="text-xl font-bold truncate">{title}</h1>
        <h1 className="  truncate">
          Author: <span className="font-bold">{author} </span>
        </h1>
        <h1 className="text-12 capitalize truncate">{description}</h1>
      </figure>
    </div>
  );
};

export default PodcastCard;
