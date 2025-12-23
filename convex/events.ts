import { query } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Return a generous slice to avoid missing older rows if the UI expects more.
    const rows = await ctx.db.query("events").order("desc").take(500)

    return rows.map(({ _id, event, url, referrer, userAgent, ip, receivedAtMs, _creationTime }) => ({
      _id,
      event,
      url,
      referrer,
      userAgent,
      ip,
      receivedAtMs: receivedAtMs ?? _creationTime,
      createdAtMs: _creationTime,
    }))
  },
})
