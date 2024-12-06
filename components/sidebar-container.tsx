"use client"

import { WorkspaceChat } from "@/components/workspace-chat"
import { TeamSidebar } from "@/components/team-sidebar"
import { useCallback, useEffect, useRef, useState } from "react"

interface SidebarContainerProps {
  onTeamMemberSelect: (teamMemberId: string) => void
  selectedTeamMember: string
}

export function SidebarContainer({ onTeamMemberSelect, selectedTeamMember }: SidebarContainerProps) {
  const [chatHeight, setChatHeight] = useState(600)  // Increased from 200 to 300
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startY = useRef(0)
  const startHeight = useRef(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startY.current = e.clientY
    startHeight.current = chatHeight
    document.body.style.cursor = 'row-resize'
    // Prevent text selection while dragging
    document.body.style.userSelect = 'none'
  }, [chatHeight])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return

    const delta = e.clientY - startY.current
    const newHeight = Math.max(100, Math.min(startHeight.current + delta, 800))
    setChatHeight(newHeight)
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div className="w-80 flex flex-col bg-card border-r" ref={containerRef}>
      <div style={{ height: chatHeight }}>
        <WorkspaceChat className="h-full" />
      </div>
      <div 
        className="h-2 bg-border hover:bg-accent cursor-row-resize flex items-center justify-center"
        onMouseDown={handleMouseDown}
      >
        <div className="w-8 h-1 rounded-full bg-muted-foreground/20" />
      </div>
      <div className="flex-1 min-h-0">
        <TeamSidebar 
          onTeamMemberSelect={onTeamMemberSelect} 
          selectedTeamMember={selectedTeamMember}
        />
      </div>
    </div>
  )
}
