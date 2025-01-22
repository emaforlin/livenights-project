import { EventProvider } from "@/context/EventContext"
import { TicketsProvider } from "@/context/TicketsContext"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
      <TicketsProvider>
        <EventProvider>
          {children}
        </EventProvider>
      </TicketsProvider>
      </>
    )
  }