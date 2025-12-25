import { ConvexHttpClient } from "convex/browser"
import type { FunctionReference } from "convex/server"

import type { EventRow } from "@/components/live-events-table"
import { LiveEventsTable } from "@/components/live-events-table"

// Ensure the page is always dynamic so we fetch the latest rows.
export const dynamic = "force-dynamic"
export const revalidate = 0

// Prefer the Vercel-provided public Convex URL, fall back to a locally set value.
const rawConvexUrl = (process.env.CONVEX_DEPLOY_KEY ?? process.env.CONVEX_URL)?.trim()
const eventsListRef = "events:list" as unknown as FunctionReference<"query">

function createConvexClient(url: string) {
  // If the user provided the HTTP Actions domain (.convex.site), swap to the query domain (.convex.cloud).
  const normalizedUrl = url.endsWith(".convex.site") ? url.replace(".convex.site", ".convex.cloud") : url
  const allowConvexSite = normalizedUrl.endsWith(".convex.site")
  return new ConvexHttpClient(
    normalizedUrl,
    allowConvexSite ? { skipConvexDeploymentUrlCheck: true } : undefined
  )
}

async function getEvents(): Promise<EventRow[]> {
  if (!rawConvexUrl) {
    console.error("Missing CONVEX_URL for Convex connection")
    return []
  }

  try {
    const client = createConvexClient(rawConvexUrl)
    const result = (await client.query(eventsListRef, {})) as unknown

    if (!Array.isArray(result)) {
      return []
    }

    const mapped = result.map((event) => {
      const receivedAt =
        typeof event.receivedAtMs === "number"
          ? event.receivedAtMs
          : typeof event.createdAtMs === "number"
            ? event.createdAtMs
            : Date.now()

      return {
        id: event._id ?? event.id,
        event: event.event ?? "unknown",
        url: event.url ?? null,
        referrer: event.referrer ?? null,
        userAgent: event.userAgent ?? null,
        ip: event.ip ?? null,
        receivedAtMs: receivedAt,
        createdAtMs: typeof event.createdAtMs === "number" ? event.createdAtMs : undefined,
      }
    })

    console.info(`[events:list] fetched ${mapped.length} rows`)
    return mapped
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
