"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from 'next/link';
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area"

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

export function TeamSidebar({ onTeamMemberSelect, selectedTeamMember = "" }: TeamSidebarProps) {
  const handleUserClick = (userId: string) => {
    onTeamMemberSelect(userId === selectedTeamMember ? "" : userId)
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-none p-4 border-b">
        <h2 className="font-semibold">Team Members</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-1">
          <button
            onClick={() => onTeamMemberSelect("")}
            className={cn(
              "w-full flex items-center px-4 py-2.5 rounded-md transition-colors",
              selectedTeamMember === ""
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
                selectedTeamMember === member.id
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatar} alt={member.name} />
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
      </ScrollArea>
    </div>
  )
}
