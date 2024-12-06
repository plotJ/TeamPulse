"use client"

import { useState } from "react"
import { ChatMessage } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"

const dummyMessages: ChatMessage[] = [
  {
    id: 1,
    content: "Hey team! How's everyone doing today?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    author: {
      name: "Sarah Chen",
      avatar: "/avatars/placeholder.svg",
      role: "Product Manager"
    }
  },
  {
    id: 2,
    content: "Working on the new feature launch. Making good progress!",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    author: {
      name: "Tom Wilson",
      avatar: "/avatars/placeholder.svg",
      role: "Software Engineer"
    }
  },
  {
    id: 3,
    content: "Great to hear! Let me know if you need any help with testing.",
    timestamp: new Date(Date.now() - 900000).toISOString(),
    author: {
      name: "Alex Kim",
      avatar: "/avatars/placeholder.svg",
      role: "QA Engineer"
    }
  }
]

interface WorkspaceChatProps {
  className?: string
}

export function WorkspaceChat({ className }: WorkspaceChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(dummyMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now(),
      content: newMessage,
      timestamp: new Date().toISOString(),
      author: {
        name: "Current User",
        avatar: "/avatars/placeholder.svg",
        role: "Software Engineer"
      }
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={`flex flex-col h-[300px] border rounded-lg ${className}`}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Workspace Chat</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={message.author.avatar} />
                <AvatarFallback>{message.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{message.author.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm mt-1">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex gap-2">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
}
