"use client";

import { ChevronRight, LayoutDashboard, Ticket, UserPen, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useRole } from "@/context/RoleContext"
import PermissionWrapper from "./PermissionWrapper";

const adminItems = [
  {
    title: "General",
    url: "/dashboard",
    icon: LayoutDashboard,
    items: [
      {
        title: "Ventas",
        url: "#"
      }
    ]
  },
  {
    title: "Eventos",
    url: "/dashboard#Events",
    icon: Ticket,
  },
  {
    title: "Colaboradores",
    url: "#",
    icon: UserPen
  },
]

const guestItems = [
  {
    title: "Eventos",
    url: "/dashboard",
    icon: LayoutDashboard,
    items: [
      {
        title: "Ventas",
        url: "#"
      }
    ]
  },
]

export function NavMain() {
  const {roles} = useRole();
  return (
    <SidebarGroup>
      <PermissionWrapper allowedRoles={["PRODUCER"]}> 
        <SidebarGroupLabel>Admin Role</SidebarGroupLabel>
        <SidebarMenu>
          {adminItems.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <Link href={item.url}>
                      <span>{item.title}</span>
                    </Link>
                    {item.items && (<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />)}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
            ))}
        </SidebarMenu>
      </PermissionWrapper>
    </SidebarGroup>
  )
}
