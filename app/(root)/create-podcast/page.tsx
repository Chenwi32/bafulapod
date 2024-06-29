"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { typecast, z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader2 } from "lucide-react";
import { GeneratePodcastProps, PodcastCardProps, VoiceType } from "@/types";

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "Invalid Title",
  }),
  podcastDescription: z.string().min(2, {
    message: "Please make the description a litle more explicit.",
  }),
  Id: z.string(),
});

const CreatePodcast = () => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStorageId, setImageStorageId] = useState<GeneratePodcastProps | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState("");

  const [audioUrl, setAudioUrl] = useState("");
  const [audioStorageId, setAudioStorageId] = useState < GeneratePodcastProps | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);

  const [voicePrompt, setVoicePrompt] = useState("");

  const [voiceType, setVoiceType] = useState<VoiceType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const voiceCategory = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];

  return (
    <section className="container max-w-lg">
      <h1 className="font-bold text-xl mb-12">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-12"
        >
          <div className="flex flex-col gap-[30px]  pb-20 border-b border-slate-800">
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

            <div className="flex flex-col gap-2.5 w-full">
              <label className="text-16 font-bold "> Select AI Voice</label>

              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger className="w-full text-lg  rounded">
                  <SelectValue placeholder="Select AI Voice" />
                </SelectTrigger>
                <SelectContent className=" bg-slate-100 font-bold focus:ring-orange-400">
                  {voiceCategory.map((category) => {
                    return (
                      <SelectItem
                        className=" capitalize focus:bg-orange-400 focus:text-slate-100 "
                        key={category}
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
                {voiceType && (
                  <audio
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>

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

          <div className="flex flex-col pt-10 ">
            <GeneratePodcast
              voiceType={voiceType}
              voicePrompt={voicePrompt}
              setAudio={setAudioUrl}
              setAudioStorageId={setAudioStorageId}
              audio={audioUrl}
              setAudioDuration={setAudioDuration}
              setVoicePrompt={setVoicePrompt}
            />
            <GenerateThumbnail />

            <div className="mt"></div>
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
