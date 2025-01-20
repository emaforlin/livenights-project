"use client";

import { ChevronRight, Compass, LayoutDashboard, Search, Ticket, UserPen, type LucideIcon } from "lucide-react"

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

const producerItems = [
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
    items: [
      {
        title: "Tickets",
        url: "/dashboard/tickets"
      }
    ]
  },
  {
    title: "Colaboradores",
    url: "#",
    icon: UserPen
  },
]

const userItems = [
  {
    title: "Buscar eventos",
    url: "/events",
    icon: Search,
  }, {
    title: "Mis Tickets",
    url: "/user/tickets",
    icon: Ticket
  }
]

const guestItems = [
  {
    title: "Buscar eventos",
    url: "/events",
    icon: Search,
  }
]

export function NavMain() {
  
  return (
    <SidebarGroup>
      <PermissionWrapper allowedRoles={["PRODUCER"]}> 
        <SidebarGroupLabel>Seccion Productor</SidebarGroupLabel>
        <SidebarMenu>
          {producerItems.map((item) => (
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

      <PermissionWrapper allowedRoles={["USER"]}>
      <SidebarGroupLabel>Seccion Usuario</SidebarGroupLabel>
        <SidebarMenu>
          {userItems.map((item) => (
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

      <PermissionWrapper allowedRoles={["GUEST"]}>
      <SidebarGroupLabel>Seccion Usuario</SidebarGroupLabel>
        <SidebarMenu>
          {guestItems.map((item) => (
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
