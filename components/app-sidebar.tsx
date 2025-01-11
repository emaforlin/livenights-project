"use client"

import * as React from "react"
import {
  Ticket,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { EventSwitcher } from "@/components/event-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import {FullEvent} from "@/types/event"


const data = {
  user: {
    firstname: "Emanuel",
    lastname: "Forlin",
    email: "m@example.com",
    avatar: "/avatars/emanuel.jpg",
  },
}

const convertToEventSwType = (fullEvent: FullEvent): {
  title: string
  date: string
  logo: React.ElementType
} => {
  return {
    title: fullEvent.title,
    date: (new Date(fullEvent.date)).toLocaleDateString(),
    logo: Ticket

  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}