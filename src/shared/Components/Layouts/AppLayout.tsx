import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Outlet } from "react-router-dom"
import Nav from "@/pages/Nav"

function AppLayout() {
  return (
    <div className="flex min-h-svh w-full">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-4">
            <SidebarTrigger />
            <Nav />
          </div>
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}

export default AppLayout 