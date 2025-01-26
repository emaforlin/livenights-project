import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { getSession } from "@/app/lib/dal";
import RedirectBtn from "./RedirectBtn";
import { DropdownMenu } from "./ui/dropdown-menu";

type UserData = {
  firstname: string
  lastname: string
  email: string
  avatar: string
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {  
    const session = await getSession();

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
        };
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <NavMain />
            </SidebarContent>
            <SidebarFooter>
                { session && (<NavUser user={user} />) || 
                    <RedirectBtn href="/auth/login" className="truncate bg-black">Iniciar Sesión</RedirectBtn> 
                }
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}