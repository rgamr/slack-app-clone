import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const heartbeat = mutation({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return;

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) return;

    const existing = await ctx.db
      .query("presence")
      .withIndex("by_member_id", (q) => q.eq("memberId", member._id))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { updatedAt: Date.now() });
    } else {
      await ctx.db.insert("presence", {
        memberId: member._id,
        workspaceId: args.workspaceId,
        updatedAt: Date.now(),
      });
    }
  },
});

export const getOnlineMembers = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const threshold = Date.now() - 120000; // 2 minutes

    const presence = await ctx.db
      .query("presence")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
      .filter((q) => q.gte(q.field("updatedAt"), threshold))
      .collect();

    return presence.map((p) => p.memberId);
  },
});
