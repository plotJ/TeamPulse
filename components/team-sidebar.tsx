import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface TeamSidebarProps {
  onTeamMemberSelect: (teamMemberId: string) => void;
}

// This would typically come from your backend
const teamMembers = [
  {
    id: 1,
    name: "Jamie L.",
    avatar: "/avatars/01.png",
    role: "Product Designer"
  },
  {
    id: 2,
    name: "Clara S.",
    avatar: "/avatars/02.png",
    role: "Developer"
  },
  {
    id: 3,
    name: "Tom Wilson",
    avatar: "/avatars/03.png",
    role: "Marketing"
  }
]

export function TeamSidebar({ onTeamMemberSelect }: TeamSidebarProps) {
  const [activeUser, setActiveUser] = useState(teamMembers[0].id)

  const handleUserClick = (userId: number) => {
    setActiveUser(userId);
    onTeamMemberSelect(userId.toString());
  }

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/company-logo.png" alt="Company Logo" />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Dane Maxwell Inc</h2>
            <p className="text-sm text-muted-foreground">Knowledge Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <h3 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Team Members
          </h3>
          <div className="space-y-1">
            {teamMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => handleUserClick(member.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors",
                  activeUser === member.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{member.name}</span>
                  <span className="text-xs text-muted-foreground">{member.role}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
