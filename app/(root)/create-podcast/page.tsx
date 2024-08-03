"use client";
import React, {
  useRef,
  useState,
} from "react";
import { useForm, } from "react-hook-form";
import {  z } from "zod";



import { Loader2, Upload } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { Toast } from "@/components/ui/toast";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

////////////////////// Main Function //////////////////////////////
const CreatePodcast = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const { toast } = useToast();

  const podcastInput = useRef<HTMLInputElement>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<File | null>(null);
  const [storageId, setStorageId] = useState<Id<"_storage"> | null>(null);
/*   const [podcastTitle, setPodcastTitle] = useState<string>('');
  const [podcastDescription, setPodcastDescription] = useState<string>(''); */

  const publishPodcast = useMutation(api.podcast.createPodcast);

 const {
   register,
   handleSubmit,
 } = useForm();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getAudioUrl = useMutation(api.podcast.getUrl);

  const handleAudio = async (blob: Blob, fileName: string) => {
    setIsUploading(true);
    setSelectedPodcast(null);
    try {
      const file = new File([blob], fileName, { type: "audio/mp3" });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });

      setAudioUrl(audioUrl!);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
      toast({ title: "Error Uploading Podcast", variant: "destructive" });
      setIsUploading(false);
    }
  };

  const upLoadAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file
        .arrayBuffer()
        .then((arrayBuffer) => new Blob([arrayBuffer]));
      handleAudio(blob, file.name);
      toast({
        title: "Successfully Uploaded your Podcast",
        variant: "destructive",
        type: "foreground",
      });
    } catch (error) {
      console.log(error);
      toast({ title: "Error Uploading Podcast", variant: "destructive" });
    }
  };

  // 2. Define a submit handler.


  const onSubmit = async (data: any) => {
      if (
        audioUrl === "" ||
        null ||
        data.podcastTitle === "" ||
        data.podcastDescription === ""
      ) {
        toast({
          title: "Please check to make sure all fields have been filled",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
        
       /*  throw new Error(
          "Please check to make sure all fields have been filled"
        ); */
        
      }
    try {
      setIsSubmitting(true);

      const podcast = await publishPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl: audioUrl,
        views: 0,
        audioStorageId: storageId!,
      });

      toast({
        title: "Successfull",
        description: "You have successfully published your podcast",
        variant: "destructive",
        type: "foreground",
      });
      setIsSubmitting(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "There was an error publishing your podcast",
        variant: "destructive",
        type: "foreground",
      });
      setIsSubmitting(false);
    }
  }

  /////////
  

  return (
    <section className="container max-w-lg">
      <Toast />
      <h1 className="font-bold text-xl mb-12">Create Podcast</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-12"
      >
        <div className="flex flex-col gap-[30px]">
          <label className="text-16 font-bold">
            Podcast Title <span className="font-extrabold text-red-500">*</span>
          </label>

          <input
            className=" focus-visible:ring-orange-400 input-class"
            placeholder="Podcast Title"
            {...register("podcastTitle")}
          />

          <label className="text-16 font-bold">
            Podcast Description{" "}
            <span className="font-extrabold text-red-500">*</span>
          </label>

          <textarea
            className=" focus-visible:ring-orange-400 input-class"
            placeholder="Write a podcast description"
            {...register("podcastDescription")}
          />
        </div>

        <div className="flex flex-col w-80 m-auto">
          <div
            className="flex flex-col h-40  bg-slate-300 items-center cursor-pointer "
            onClick={() => podcastInput?.current?.click()}
          >
            <input
              className="hidden"
              type="file"
              ref={podcastInput}
              onChange={(e) => upLoadAudio(e)}
              disabled={isUploading}
            />
            {isUploading ? (
              <div className="flex gap-5 mt-5 justify-center items-center h-full w-full">
                Uploading <Loader2 className="animate-spin" />
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-5 justify-center items-center h-full w-full">
                <Upload className="size-10" />
                <span>Upload Podcast</span>
                <span className="font-thin text-14 text-slate-700">
                  File type: mpeg or ogg
                </span>
              </div>
            )}
          </div>
          <span className="font-bold text-16 mt-2">Select The Audio file</span>
        </div>

        <div>
          {isUploading ? (
            <div className="flex gap-5 mt-5 justify-center items-center h-full w-full">
              Uploading <Loader2 className="animate-spin space-x-2" />
            </div>
          ) : (
            <>
              <audio src={audioUrl} controls />
            </>
          )}
        </div>

        <button
           className="text-white font-extrabold py-2 px-10 w-fit bg-orange-400 rounded"
          type="submit"
        
        >{isSubmitting ? (
              <span className="flex justify-between">
                Submitting <Loader2 className="ml-3 animate-spin" />
              </span>
            ) : (
              "Publish Podcast"
            )}</button>
      </form>
    </section>
  );
};

export default CreatePodcast;
