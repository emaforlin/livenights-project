import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SessionProvider } from "next-auth/react";
import { RoleProvider } from "@/context/RoleContext";
import { getUserRole } from "./lib/dal";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by Emanuel Forlin",
};


export default async function Layout({ children }: { children: React.ReactNode }) {
  const role = await getUserRole();
  return (
  <html>
    <body className="h-full w-full">
      <RoleProvider role={role}>
        <SessionProvider>
            <SidebarProvider>
              <AppSidebar />
                <SidebarTrigger />
                {children}
                <Toaster />
            </SidebarProvider>
          </SessionProvider>
        </RoleProvider>
    </body>
  </html>
  )
}
