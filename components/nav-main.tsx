"use client";

import { Home, LayoutDashboard, Search, Ticket, UserPen } from "lucide-react";

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

const routes = [
    {
        title: "Inicio",
        icon: Home,
        url: "/"
    }
]

const producerItems = [
    {
        title: "Eventos",
        url: "/dashboard#Events",
        icon: LayoutDashboard,
    }, 
    {
        title: "Tandas de Tickets",
        url: "/dashboard/tickets",
        icon: Ticket
    },
    {
        title: "Colaboradores",
        url: "#unimplemented",
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
    return (<>
        <SidebarGroup>
            <SidebarMenu>
                {routes.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <Link href={item.url}>
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
        
        <PermissionWrapper allowedRoles={["PRODUCER"]}>
            <SidebarGroup>
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
            </SidebarGroup>
        </PermissionWrapper>

        <PermissionWrapper allowedRoles={["USER"]}>
            <SidebarGroup>
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
            </SidebarGroup>
        </PermissionWrapper>


        <PermissionWrapper allowedRoles={["GUEST"]}>
            <SidebarGroup>
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
            </SidebarGroup>
        </PermissionWrapper></>
    );
}
