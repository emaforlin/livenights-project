import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SessionProvider } from "next-auth/react";
import { RoleProvider } from "@/context/RoleContext";
import { Toaster } from "@/components/ui/toaster";
import { UserTicketsProvider } from "@/context/UserTicketsContext";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by Emanuel Forlin",
};


export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body className="h-full w-full">
                <SessionProvider>
                    <RoleProvider>
                        <UserTicketsProvider>
                            <SidebarProvider>
                                <div className="flex h-screen">
                                    <AppSidebar />
                                </div>
                                <SidebarTrigger />
                                {children}
                                <Toaster />
                            </SidebarProvider>
                        </UserTicketsProvider>
                    </RoleProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
