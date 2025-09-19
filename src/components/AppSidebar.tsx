import { Award, BookA, BookAIcon, BookCheck, Calendar, Home, Inbox, Search, Settings, Trophy } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import Appside from "@/components/ui/appside"
import { ModeToggle } from './mode-toggle'
import { Link } from 'react-router-dom'


const items = [
  { title: "Home", url: "/Home", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Course/Subjects ", url: "/subject-course", icon: BookCheck },
  { title: "Grades", url: "/grades", icon: Award },
  { title: "Deans Lister", url: "/table-data", icon: Trophy },
]

const dropdownItems = [
  { title: "Settings", url: "/settings", icon: Settings },
]

function AppSidebar() {
  return (
    <Sidebar className="z-50">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">CSTA LMS</h2>
          <div className="ml-auto mt-0.5">
            <ModeToggle />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <span>More</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {dropdownItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <a href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Appside />
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar } 