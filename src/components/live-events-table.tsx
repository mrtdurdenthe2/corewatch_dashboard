import { ChevronRight } from "lucide-react"

interface EventRow {
  eventType: string
  ip: string
  type: string
  lastMod: string
  status: "success" | "error"
}

const events: EventRow[] = [
  { eventType: "PAGE_ENTER", ip: "192.168.0.1", type: "TOML Source File", lastMod: "19/03/25", status: "success" },
  { eventType: "BUTTON_CLICK", ip: "192.168.0.1", type: "Rust", lastMod: "19/03/25", status: "success" },
  { eventType: "BUTTON_CLICK", ip: "192.168.0.1", type: "Rust", lastMod: "19/03/25", status: "success" },
  { eventType: "N/A", ip: "1 kb", type: "Rust", lastMod: "19/03/25", status: "error" },
]

export function LiveEventsTable() {
  return (
    <div className="w-full max-w-3xl">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
        Live events
        <ChevronRight className="h-4 w-4" />
      </h2>

      <div className="rounded-lg border-white/[0.08] bg-[#080808] p-3 py-1 px-[3px] border">
        {/* Header row */}
        <div className="grid grid-cols-[1.5fr_1fr_1.5fr_1fr] gap-4 px-3 text-sm text-[#929292] pt-0.5 pb-1.5">
          <span>Event type</span>
          <span>IP</span>
          <span>Type</span>
          <span>Last Mod</span>
        </div>

        {/* Event rows */}
        <div className="flex flex-col gap-1">
          {events.map((event, index) => (
            <div
              key={index}
              className={`grid grid-cols-[1.5fr_1fr_1.5fr_1fr] gap-4 rounded px-3 py-1 font-mono text-sm text-white ${
                event.status === "success" ? "bg-[rgba(0,68,2,0.29)]" : "bg-[rgba(255,0,0,0.15)]"
              }`}
            >
              <span>{event.eventType}</span>
              <span>{event.ip}</span>
              <span>{event.type}</span>
              <span>{event.lastMod}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
