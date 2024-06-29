// for third party APIs
import { action } from "./_generated/server";
import { v } from "convex/values";

import OpenAI from 'openai'

/* const openai= new OpenAI({apiKey: process.env.})
export const generateAudio = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (ctx, args) => {
   const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: "Today is a wonderful day to build something people love!",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);

      //optional 
      return 'success'
  },
}); */