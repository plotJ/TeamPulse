"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from 'next/link';
import Image from 'next/image';

interface TeamSidebarProps {
  onTeamMemberSelect: (teamMemberId: string) => void;
  selectedTeamMember?: string;
}

// This would typically come from your backend
const teamMembers = [
  {
    id: "jamie",
    name: "Jamie L.",
    avatar: "/avatars/01.svg",
    role: "Product Designer",
    color: "#E6F3FF"
  },
  {
    id: "sarah",
    name: "Sarah M.",
    avatar: "/avatars/02.svg",
    role: "Frontend Developer",
    color: "#E6FFE6"
  },
  {
    id: "tom",
    name: "Tom Wilson",
    avatar: "/avatars/03.svg",
    role: "Marketing",
    color: "#FFF3E6"
  }
]

export function TeamSidebar({ onTeamMemberSelect, selectedTeamMember }: TeamSidebarProps) {
  const [activeUser, setActiveUser] = useState<string | null>(null)

  const handleUserClick = (userId: string) => {
    if (activeUser === userId) {
      setActiveUser(null)
      onTeamMemberSelect("")
    } else {
      setActiveUser(userId)
      onTeamMemberSelect(userId)
    }
  }

  return (
    <div className="w-64 border-r bg-background">
      <div className="flex flex-col h-screen">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/team-logo.svg"
              alt="TeamPulse Logo"
              width={32}
              height={32}
              className="dark:invert"
            />
            <span className="font-bold text-lg">TeamPulse</span>
          </Link>
        </div>
        <div className="p-4">
          <h2 className="font-semibold mb-4">Team Members</h2>
          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveUser(null)
                onTeamMemberSelect("")
              }}
              className={cn(
                "w-full flex items-center px-4 py-2.5 rounded-md transition-colors",
                activeUser === null
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/team-logo.svg" alt="All Members" />
                  <AvatarFallback>ALL</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-none mb-1">All Members</p>
                  <p className="text-xs text-muted-foreground">Team</p>
                </div>
                <div className="h-2.5 w-2.5 rounded-full border flex-shrink-0 opacity-0" />
              </div>
            </button>
            {teamMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => handleUserClick(member.id)}
                className={cn(
                  "w-full flex items-center px-4 py-2.5 rounded-md transition-colors",
                  activeUser === member.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/placeholder.svg" alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-none mb-1">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <div 
                    className="h-2.5 w-2.5 rounded-full border flex-shrink-0"
                    style={{ backgroundColor: member.color }}
                    title="Team member color"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
