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
import { SessionProvider, useSession } from "next-auth/react"
import SigninBtn from "./auth/SigninBtn"
import { getSession, getUserRoles } from "@/app/lib/dal"
import { RoleProvider } from "@/context/RoleContext"


const data = {
  user: {
    firstname: "Emanuel",
    lastname: "Forlin",
    email: "m@example.com",
    avatar: "/avatars/emanuel.jpg",
  },
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {  
  const session = await getSession();
  const roles = await getUserRoles();
  return (
    <RoleProvider roles={roles}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarContent>
          <NavMain />
        </SidebarContent>
        <SidebarFooter>
          { session && (<NavUser user={data.user} />) || (<SigninBtn/>)}
          
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </RoleProvider>
  )
}