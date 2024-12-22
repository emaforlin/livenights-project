import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { LogIn } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by Emanuel Forlin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    // Unauthenticated items.
const unprivilegedUserItems = [
  {
    title: "Login",
    url: "/login",
    icon: LogIn,
  },
]

  return (
  <html>
    <body>
    <SidebarProvider>
    <AppSidebar items={unprivilegedUserItems}/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </body>
  </html>
  )
}
