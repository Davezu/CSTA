import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSideBar"
import { Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <div className="flex h-svh w-full overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex items-center gap-4 p-4 pb-2 flex-shrink-0 sticky top-0 bg-background z-20">
            <SidebarTrigger />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}

export default AppLayout 