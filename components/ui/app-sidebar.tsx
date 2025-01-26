"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar";


const data = {
    user: {
        firstname: "Emanuel",
        lastname: "Forlin",
        email: "m@example.com",
        avatar: "/avatars/emanuel.jpg",
    },
};


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
    );
}