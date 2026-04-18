"use client"

import * as React from "react"
import {
  Atom,
  ChartBar,
  Calculator,
  GraduationCap,
  LayoutDashboard,
  FlaskConical,
  FileStack,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  subjects: [
    { name: "Physics", logo: Atom, level: "2 Bac" },
    { name: "Mathematics", logo: Calculator, level: "1 Bac" },
    { name: "Chemistry", logo: FlaskConical, level: "2 Bac" },
  ],
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Content Management",
      url: "#",
      icon: FileStack,
    },
    {
      title: "Students",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "Comments",
          url: "#",
        },
        {
          title: "Announcements",
          url: "#",
        },
        {
          title: "Students List",
          url: "#",
        },

      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartBar,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher subjects={data.subjects} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />    
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
