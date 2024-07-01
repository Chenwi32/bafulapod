import { GeneratePodcastProps } from "@/types";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const useGeneratePodcast = ({setAudio, voicePrompt, setAudioStorageId}: GeneratePodcastProps) => {

    const [isGenerating, setisGenerating] = useState(false)

    const generatePodcast =  async() => {
        setisGenerating(true)
        setAudio('')
        if (!voicePrompt) {
            return setisGenerating(false)
        }

        try {
            
        } catch (error) {
            console.log("Error generating podcast")
            // Taost
            setisGenerating(false)
        }
    }
    return {
        isGenerating,
        generatePodcast
    }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
    const {isGenerating, generatePodcast} = useGeneratePodcast(props);

  return (
    <div className="mb-12">
      {" "}
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold">
          AI prompt to generate a podcast
        </Label>
        <Textarea
          placeholder="Give a prompt for me to generate a podcast"
          className="input-class focus:ring-offset-orange-400"
          rows={5}
         /*  value={voicePrompt}
          onChange={(e) => {
            setVoicePrompt(e.target.value);
          }} */
        ></Textarea>
      </div>
      <div className="mt-5 w-full max-w-[200px">
        <Button
          className="text-white hover:bg-slate-700 font-bold bg-orange-400 w-fit box-border rounded"
                  type="submit"
                  onClick={e => {
                      e.preventDefault()

                  }}
        >
          {isGenerating ? (
            <>
              Generating <Loader2 className="ml-3 animate-spin" />
            </>
          ) : (
            "Generate Podcast"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay 
          className="mt-5"
          onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
