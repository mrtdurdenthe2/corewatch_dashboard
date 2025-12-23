import { ChevronRight } from "lucide-react"

export type EventRow = {
  id?: string
  event: string
  url?: string | null
  referrer?: string | null
  userAgent?: string | null
  ip?: string | null
  receivedAtMs: number
  createdAtMs?: number
}

interface LiveEventsTableProps {
  events?: EventRow[]
}

export function LiveEventsTable({ events = [] }: LiveEventsTableProps) {
  const hasEvents = events.length > 0

  return (
    <div className="w-full max-w-5xl">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
        Live events
        <ChevronRight className="h-4 w-4" />
      </h2>

      <div className="rounded-lg border border-white/[0.08] bg-[#080808] p-3">
        {/* Header row */}
        <div className="grid grid-cols-[1.2fr_1.6fr_1.6fr_1.2fr_1fr_1fr] gap-3 px-2 text-sm text-[#929292] pb-2">
          <span>Event</span>
          <span>URL</span>
          <span>Referrer</span>
          <span>User Agent</span>
          <span>IP</span>
          <span>Received</span>
        </div>

        {/* Event rows */}
        {hasEvents ? (
          <div className="flex flex-col gap-1">
            {events.map((eventRow, index) => (
              <div
                key={eventRow.id ?? index}
                className="grid grid-cols-[1.2fr_1.6fr_1.6fr_1.2fr_1fr_1fr] items-start gap-3 rounded bg-[rgba(255,255,255,0.02)] px-2 py-2 font-mono text-[13px] text-white"
              >
                <span className="truncate" title={eventRow.event}>
                  {eventRow.event}
                </span>
                <span className="truncate" title={eventRow.url ?? ""}>
                  {eventRow.url ?? "—"}
                </span>
                <span className="truncate" title={eventRow.referrer ?? ""}>
                  {eventRow.referrer ?? "—"}
                </span>
                <span className="truncate" title={eventRow.userAgent ?? ""}>
                  {eventRow.userAgent ?? "—"}
                </span>
                <span className="truncate" title={eventRow.ip ?? ""}>
                  {eventRow.ip ?? "—"}
                </span>
                <span>
                  {new Date(eventRow.receivedAtMs).toLocaleString(undefined, {
                    hour12: false,
                  })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded bg-black/30 px-3 py-6 text-sm text-[#929292]">
            No events yet.
          </div>
        )}
      </div>
    </div>
  )
}
