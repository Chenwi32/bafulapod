"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const CreatePodcast = () => {

  const [voiceType, setVoiceType] = useState<string | null>(null)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
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
    <section>
      <h1 className="font-bold text-xl mb-12">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-12"
        >
          <div className="flex flex-col gap-[30px] border-b border-slate-950 pb-10">
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
          </div>

          <Button
            className="text-white hover:bg-orange-300 font-bold bg-orange-400 w-fit box-border rounded"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
