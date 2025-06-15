
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { Home, LayoutGrid, Compass, MessageSquare, Gem, HelpCircle, Settings } from "lucide-react";

const menuItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { to: "/explore", icon: Compass, label: "Explore" },
    { to: "/messages", icon: MessageSquare, label: "Messages" },
    { to: "/premium", icon: Gem, label: "Premium" },
];

const bottomMenuItems = [
    { to: "/settings", icon: Settings, label: "Settings" },
    { to: "/help-center", icon: HelpCircle, label: "Help Center" },
]

export function AppSidebar() {
    const location = useLocation();

    return (
        <Sidebar collapsible="icon">
            <SidebarContent className="flex flex-col">
                <SidebarGroup className="flex-1" asChild>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.to}>
                                <SidebarMenuButton asChild isActive={item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)} tooltip={item.label}>
                                    <Link to={item.to}>
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarFooter>
                    <SidebarMenu>
                        {bottomMenuItems.map((item) => (
                           <SidebarMenuItem key={item.to}>
                               <SidebarMenuButton asChild isActive={location.pathname.startsWith(item.to)} tooltip={item.label}>
                                   <Link to={item.to}>
                                       <item.icon className="h-5 w-5" />
                                       <span>{item.label}</span>
                                   </Link>
                               </SidebarMenuButton>
                           </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
