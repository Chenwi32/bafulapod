"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, typecast, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, {
  ReactElement,
  ReactEventHandler,
  useContext,
  useRef,
  useState,
} from "react";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { GeneratePodcastProps, PodcastCardProps, VoiceType } from "@/types";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { query } from "@/convex/_generated/server";
import { useUser } from "@clerk/nextjs";
import { podcastData } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import { title } from "process";
import { useUploadFiles } from "@xixixao/uploadstuff/react";

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "Invalid Title",
  }),
  podcastDescription: z.string().min(2, {
    message: "Please make the description a litle more explicit.",
  }),
  /*  podcast: (2, {
    message: "Please make the description a litle more explicit.",
  }), */
  Id: z.string(),
});

////////////////////// Main Function //////////////////////////////
const CreatePodcast = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [audio, setAudio] = useState("");
  const { toast } = useToast();

  const podcastInput = useRef<HTMLInputElement>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<File | null>(null);
  const [storageId, setStorageId] = useState<File | null>(null);
  const { user } = useUser();

  // 1. Form Defination.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

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
      setAudio(audioUrl!);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
      toast({ title: "Error Uploading Podcast", variant: "destructive" });
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
    } catch (error) {
      console.log(error);
      toast({ title: "Error Uploading Podcast", variant: "destructive" });
    }
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="container max-w-lg">
      <h1 className="font-bold text-xl mb-12">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-12"
        >
          <div className="flex flex-col gap-[30px]">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold">
                    {" "}
                    Podcast Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=" focus-visible:ring-orange-400 input-class"
                      placeholder="Podcast Title"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold">
                    Podcast Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className=" focus-visible:ring-orange-400 input-class"
                      placeholder="Write a podcast description"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col ">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold">
                    select your podcast
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="audio/*"
                      ref={podcastInput}
                      onChange={(e) => upLoadAudio(e)}
                      disabled={selectedPodcast !== null}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {isUploading ? (
                <>
                  Uploading <Loader2 className="spin-in-1"/>
                </>
              ) : (
                <>
                   <audio src={audio} controls />
                </>
              )}
            </div>
          </div>

          <Button
            className="text-white hover:bg-slate-700 font-bold bg-orange-400 w-fit box-border rounded"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {isSubmitting ? (
              <>
                Submitting <Loader2 className="ml-3 animate-spin" />
              </>
            ) : (
              "Publish Podcast"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
