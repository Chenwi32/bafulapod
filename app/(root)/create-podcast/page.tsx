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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Head from "next/head";

////////////////////// Main Function //////////////////////////////
const CreatePodcast = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();

  const podcastInput = useRef<HTMLInputElement>(null);
  const ImageInput = useRef<HTMLInputElement>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [storageId, setStorageId] = useState<Id<"_storage"> | null>(null);
  const [imageStoraegId, setimageStoraegId] = useState<Id<"_storage"> | null>(
    null
  );
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
      const file = new File([blob], fileName, { type: "audio/mpeg", });
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

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsUploadingImage(true);
    setSelectedImage(null);
    try {
      const file = new File([blob], fileName, { type: "image/png" });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setimageStoraegId(storageId);

      const imageUrlInput = await getAudioUrl({ storageId });

      setImageUrl(imageUrlInput!);
      setIsUploadingImage(false);
    } catch (error) {
      console.log(error);
      toast({ title: "Error Uploading Thumbnail", variant: "destructive" });
      setIsUploadingImage(false);
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

  const upLoadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file
        .arrayBuffer()
        .then((arrayBuffer) => new Blob([arrayBuffer]));
      handleImage(blob, file.name);
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
        imageUrl: imageUrl,
        views: 0,
        audioStorageId: storageId!,
        imageStoraegId: imageStoraegId!,
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
    <>
      <Head>
        <meta property="og:title" content="NiiLong" />
        <meta
          property="og:description"
          content="Stay Connected To Your Roots Wherever You Are In The World."
        />
        <meta property="og:image" content="/icons/image0.png" />
        <meta property="og:image:width" content="500px" />
        <meta property="og:image:height" content="350px" />
      </Head>
      <section className="container max-w-lg p-0 flex flex-col">
        <Toast />
        <h1 className="font-bold text-xl mb-12">Upload Podcast</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-12 "
        >
          <div className="flex flex-col gap-[30px]">
            <label className="text-16 font-bold">
              Podcast Title{" "}
              <span className="font-extrabold text-red-500">*</span>
            </label>

            <Input
              className=" focus-visible:ring-orange-400 input-class"
              placeholder="Podcast Title"
              {...register("podcastTitle")}
            />

            <label className="text-16 font-bold">
              Podcast Description{" "}
              <span className="font-extrabold text-red-500">*</span>
            </label>

            <Textarea
              className=" focus-visible:ring-orange-400 input-class"
              placeholder="Write a podcast description"
              {...register("podcastDescription")}
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col w-full items-center mx-auto mb-10">
              <div
                className="flex flex-col h-40 w-56  bg-slate-300 items-center cursor-pointer "
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
                    <span className=" text-14 text-slate-800">
                      File type: mpeg or ogg
                    </span>
                  </div>
                )}
              </div>
              <span className=" text-16 mt-2">Select The Audio file</span>
            </div>

            {isUploading ? (
              <div className="flex gap-5 mt-5 justify-center items-center h-full w-full">
                Uploading <Loader2 className="animate-spin space-x-2" />
              </div>
            ) : (
              <>
                <div className="flex w-full justify-center flex-col gap-2">
                  <audio className="w-auto text-3" src={audioUrl} controls />
                </div>
              </>
            )}

            <div className="flex flex-col w-full items-center m-auto mt-10">
              <div
                className="flex flex-col h-40  w-56 bg-slate-300 items-center cursor-pointer "
                onClick={() => ImageInput?.current?.click()}
              >
                <input
                  className="hidden"
                  type="file"
                  ref={ImageInput}
                  onChange={(e) => upLoadImage(e)}
                  disabled={isUploadingImage}
                />
                {isUploadingImage ? (
                  <div className="flex gap-5 mt-5 justify-center items-center h-full w-full">
                    Uploading <Loader2 className="animate-spin" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 p-3 text-center mt-5 justify-center items-center h-full w-full">
                    <Upload className="size-10" />
                    <span>Upload Image</span>
                    <span className=" text-14 text-slate-800">
                      File type: PNG, JPG, JPEG of at least 500 X 359 pixels
                    </span>
                  </div>
                )}
              </div>
              <span className=" text-16 mt-2 mb-10">
                Select an image for the thumbnail
              </span>
            </div>

            <div className="min-w-56 min-h-40 mb-10 flex items-center flex-col bg-slate-100">
              {!imageUrl ? (
                <div className="flex gap-5 mt-5 justify-center items-center h-full w-full">
                  Image Preview
                </div>
              ) : (
                <>
                  <div className="flex w-full justify-center flex-col gap-2">
                    <Image
                      className="w-auto text-3"
                      width={50}
                      height={50}
                      src={imageUrl}
                      alt="Thumbnail"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              className="text-white font-extrabold py-2 mt-10 px-10 w-fit bg-orange-400 rounded"
              type="submit"
            >
              {isSubmitting ? (
                <span className="flex justify-between">
                  Submitting <Loader2 className="ml-3 animate-spin" />
                </span>
              ) : (
                "Publish Podcast"
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreatePodcast;
