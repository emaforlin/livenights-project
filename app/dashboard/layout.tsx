import { EventProvider } from "@/context/EventContext"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
      <EventProvider>
        {children}
      </EventProvider>
      </>
    )
  }