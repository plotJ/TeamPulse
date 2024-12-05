"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle } from "lucide-react"
import { Comment } from "@/types"

interface CommentsProps {
  comments?: Comment[];
  onAddComment: (content: string) => void;
}

export function Comments({ comments = [], onAddComment }: CommentsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          {comments.length > 0 ? `${comments.length} Comments` : "Comment"}
        </Button>
      </div>

      {isExpanded && (
        <div className="pl-4 space-y-4">
          {/* Comment list */}
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* New comment form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Your avatar" />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center gap-2">
              <Input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="h-8 flex-1"
              />
              <Button type="submit" variant="ghost" size="sm" className="h-8">
                Post
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
