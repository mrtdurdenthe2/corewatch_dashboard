import { ConvexHttpClient } from "convex/browser"
import type { FunctionReference } from "convex/server"

import type { EventRow } from "@/components/live-events-table"
import { LiveEventsTable } from "@/components/live-events-table"

const convexUrl = process.env.CONVEX_URL
const eventsListRef = "events:list" as unknown as FunctionReference<"query">

async function getEvents(): Promise<EventRow[]> {
  if (!convexUrl) {
    console.error("Missing CONVEX_URL for Convex connection")
    return []
  }

  try {
    const client = new ConvexHttpClient(convexUrl)
    const result = (await client.query(eventsListRef, {})) as unknown

    if (!Array.isArray(result)) {
      return []
    }

    return result.map((event) => ({
      id: event._id ?? event.id,
      event: event.event ?? "unknown",
      url: event.url ?? null,
      referrer: event.referrer ?? null,
      userAgent: event.userAgent ?? null,
      ip: event.ip ?? null,
      receivedAtMs: typeof event.receivedAtMs === "number" ? event.receivedAtMs : Date.now(),
      createdAtMs: typeof event.createdAtMs === "number" ? event.createdAtMs : undefined,
    }))
  } catch (error) {
    console.error("Failed to load events from Convex", error)
    return []
  }
}

export default async function Page() {
  const events = await getEvents()

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-8">
      <LiveEventsTable events={events} />
    </main>
  )
}
