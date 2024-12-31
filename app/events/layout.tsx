import { SidebarProvider } from "@/components/ui/sidebar"
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