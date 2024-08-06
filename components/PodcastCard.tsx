import Image from "next/image"
import { ImageIcon } from "lucide-react";

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
  
  return (
    
      <div className="bg-slate-200 shadow-lg sm:w-72 sm:min-w-36 rounded">
      <figure className="flex w-full p-0 justify-center flex-col gap-2">
        <div className="min-w-56  min-h-40 h-40">
        {
          imageUrl === undefined ? (
            <div className="p-5">
              <ImageIcon className="size-10" />
              Thumbnail not found
            </div>
          ): (
              <>
              <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={250}
          className="aspect-auto h-fit min-w-full rounded-xl"
        />
          </>
          
          )
     }   
        </div> 

        <div className="p-5 relative max-w-sm w-full">
          
              <audio className="w-full mb-5" src={audioUrl} controls />
          
        

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
