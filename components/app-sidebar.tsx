import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import SigninBtn from "./auth/SigninBtn"
import { getSession, getUserRole } from "@/app/lib/dal"
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
  const role = await getUserRole();
  return (
    <RoleProvider role={role}>
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