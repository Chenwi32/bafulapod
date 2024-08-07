import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { any } from "zod";

export default defineSchema({
  podcast: defineTable({
    user: v.optional(v.id("users")),
    podcastTitle: v.string(),
    /* podcast_id: v.string(), */
    podcastDescription: v.string(),
    audioUrl: v.optional(v.string()),
    audioStorageId: v.optional(v.id("_storage") || any),

    imageUrl: v.optional(v.string()),
    imageStoraegId: v.optional(v.id("_storage")), 
    author: v.optional(v.string()),
    authorId: v.optional(v.string()),
    authorImageUrl: v.optional(v.string()),
    /*  voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.number(),*/
    views: v.optional(v.number()),
  })
    .searchIndex("search_author", { searchField: "author" })
    .searchIndex("search_title", { searchField: "podcastTitle" })
    .searchIndex("search_body", { searchField: "podcastDescription" }),
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
});
