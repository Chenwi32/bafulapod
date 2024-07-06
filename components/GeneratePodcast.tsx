import { GeneratePodcastProps } from "@/types";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { uploadFiles } from "@xixixao/uploadstuff";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { Input } from "./ui/input";


/* 
const useGeneratePodcast = ({
  setAudio,
  voicePrompt,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const [isGenerating, setisGenerating] = useState(false);

  

  const generatePodcast = async (e: React.ChangeEvent<HTMLInputElement>) => {


    setisGenerating(true);
    setAudio("");
    /* if (!voicePrompt) {
            return setisGenerating(false)
        } / const files = Array.from(e.target.files);
    if (files.length === 0) {
      
      return;
    }
    try {
      // optionally: do something with `files`...
      const uploaded = await startUpload([files]);
      // optionally: do something with the response...
    } catch (error) {
      console.log("Error uploading podcast");
      // Taost
      setisGenerating(false);
    }
  };
  return {
    isGenerating,
    generatePodcast,
  };
}; */

const GeneratePodcast = ({setAudio, voicePrompt, setAudioStorageId}: GeneratePodcastProps) => {
 const [isUploading, setisUploading] = useState(false);
  
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getAudioUrl = useMutation(api.podcast.getUrl)
  const [uploaded, setUploaded] = useState([])

  const uploadPodcast = async () => {

    setisUploading(true)

     const storageId = (uploaded[0] as any).storageId;

    console.log(storageId)
     setAudioStorageId(storageId);
     /* const audioUrl = await getAudioUrl({ storageId }); */
  }

  return (
    <div className="mb-12">
      {" "}
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold">
          AI prompt to generate a podcast
        </Label>
        <Input
          placeholder="Give a prompt for me to generate a podcast"
          className="input-class focus:ring-offset-orange-400"
          type="file"
          onChange={async (e: React.ChangeEvent<HTMLInputElement | null>) => {
            if (!e.target.files) return; // Handle no files case

            const files = e.target.files as FileList;

            if (files.length === 0) {
              return;
            }

            try {
      // optionally: do something with `files`...
              const upload = await startUpload([files] as any);
              
             setUploaded(upload as any)
      // optionally: do something with the response...
    } catch (error) {
      console.log("Error uploading podcast");
      // Taost
      setisUploading(false);
    }

            // optionally: do something with the response...
          }}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          className="text-white hover:bg-slate-700 font-bold bg-orange-400 w-fit box-border rounded"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            uploadPodcast()
          }}
        >
          {isUploading ? (
            <>
              Uploadinging <Loader2 className="ml-3 animate-spin" />
            </>
          ) : (
            "Upload Podcast"
          )}
        </Button>
      </div>
    {/*   { && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        />
      )} */}
    </div>
  );
};

export default GeneratePodcast;
