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

type UserData = {
  firstname: string
  lastname: string
  email: string
  avatar: string
}

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

  let user: UserData = {
    firstname: "",
    lastname: "",
    email: "",
    avatar: ""
  };

  if (session && session.user) {
    const names = session.user.name!.split(" ");
    user = {
      firstname: names[0] || "",
      lastname: names[1] || "",
      email: session.user.email!,
      avatar: session.user.image!,
    }
  }

  return (
    <RoleProvider role={role}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarContent>
          <NavMain />
        </SidebarContent>
        <SidebarFooter>
          { session && (<NavUser user={user} />) || (<SigninBtn/>)}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </RoleProvider>
  )
}