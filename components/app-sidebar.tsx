"use client";

import { LogIn, LogOut, LucideIcon, Ticket } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useEffect, useState } from "react";



// Unauthenticated items.
const unprivilegedUserItems = [
  {
    title: "Login",
    url: "/login",
    icon: LogIn,
  },
]

// Authenticated user
const clientUserItems = [
  {
    title: "Mis tickets",
    url: "#",
    icon: Ticket
  },
  {
    title: "Cerrar Sesion",
    url: "#",
    icon: LogOut
  },
]


export function AppSidebar() {
  const items: {
    title: string;
    url: string;
    icon: LucideIcon
  }[] = unprivilegedUserItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
