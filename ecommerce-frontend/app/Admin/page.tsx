import { AppSidebar } from "@/Components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import React from "react";

export default function page() {
  return (
    <SidebarProvider>
      <div></div>
    </SidebarProvider>
  );
}
