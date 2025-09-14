import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSideBar"
import { Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <div className="flex min-h-svh w-full">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <div className="flex items-center gap-4 p-6 pb-0">
            <SidebarTrigger />
          </div>
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}

export default AppLayout 