"use client";

import { LayoutDashboard, Search, Ticket, UserPen } from "lucide-react";

import {
    Collapsible,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import PermissionWrapper from "./PermissionWrapper";
import { usePathname } from "next/navigation";
import { VisibilityWrapper } from "./VisibilityWrapper";

const producerItems = [
    {
        title: "General",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Eventos",
        url: "/dashboard#Events",
        icon: Ticket,
    }, 
    {
        title: "Tickets",
        url: "/dashboard/tickets",
        icon: Ticket
    },
    {
        title: "Colaboradores",
        url: "#",
        icon: UserPen
    },
];

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
];

const guestItems = [
    {
        title: "Buscar eventos",
        url: "/events",
        icon: Search,
    }
];

export function NavMain() {
    const pathname = usePathname();
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
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
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
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </SidebarMenu>
            </PermissionWrapper>

            <PermissionWrapper allowedRoles={["GUEST"]}>
                <SidebarGroupLabel>Seccion Usuario</SidebarGroupLabel>
                <SidebarMenu>
                    <VisibilityWrapper visible={!pathname.endsWith("login")}>
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
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </VisibilityWrapper>
                </SidebarMenu>
            </PermissionWrapper>
        </SidebarGroup>
    );
}
