import Image from "next/image";

const PodcastCard = ({
  id,
  title,
  description,
  audioUrl,
  imageUrl,
  author,
}: {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  author: string;
  }) => {
  
 /*  console.log(imageUrl) */
  return (
    <div className="bg-slate-200 shadow-lg  w-full rounded">
      <figure className="flex w-full p-0 justify-center flex-col gap-2">
      
      
          <Image
          src={imageUrl}
        
          alt={title}
          width={45}
          height={50}
            className="aspect-square h-fit w-full rounded-xl"
        /> 
        
        <div className="p-5 w-full">
        <audio className="mb-5" src={audioUrl} controls />

        <h1 className="text-xl font-bold truncate">{title}</h1>
        <h1 className="  truncate">
          Author: <span className="font-bold">{author} </span>
        </h1>
        <h1 className="text-12 capitalize truncate">{description}</h1>
        </div>

      </figure>
    </div>
  );
};

export default PodcastCard;
