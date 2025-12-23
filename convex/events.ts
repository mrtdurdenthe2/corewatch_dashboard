import { query } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("events")
      .withIndex("by_receivedAtMs")
      .order("desc")
      .take(200)

    return rows.map(({ _id, event, url, referrer, userAgent, ip, receivedAtMs, _creationTime }) => ({
      _id,
      event,
      url,
      referrer,
      userAgent,
      ip,
      receivedAtMs,
      createdAtMs: _creationTime,
    }))
  },
})
