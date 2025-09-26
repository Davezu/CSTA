import { Award, BookCheck, Home, Inbox, Settings, Trophy, LogOut, List } from "lucide-react"
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
import { ModeToggle } from './mode-toggle'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'


const items = [
  { title: "Home", url: "/Home", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Modules", url: "/modules", icon: BookCheck },
  { title: "Grades", url: "/grades", icon: Award },
  { title: "Deans Lister", url: "/table-data", icon: Trophy },
  { title: "Add Subject", url: "/list", icon: List },
]

const dropdownItems = [
  { title: "Settings", url: "/settings", icon: Settings },
]

function AppSidebar() {
  const { user, logout } = useAuth()
  
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
        <div className="p-4 border-t">
          {user && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.fullName} />
                  <AvatarFallback>
                    {user.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{user.fullName}</div>
                  <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar } 