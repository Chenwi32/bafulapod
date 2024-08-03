import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createPodcast = mutation({
  args: {
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioUrl: v.string(),
    audioStorageId: v.id("_storage"),

    views: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You are not logged in");
    }
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    const podcast = await ctx.db.insert("podcast", {
      audioStorageId: args.audioStorageId,
      user: user[0]._id,
      podcastTitle: args.podcastTitle,
      podcastDescription: args.podcastDescription,
      audioUrl: args.audioUrl,

      author: user[0].name,
      authorId: user[0].clerkId,

      views: args.views,
      authorImageUrl: user[0].imageUrl,
    });
    return podcast;
  },
});

export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("podcast").collect();
  },
});


