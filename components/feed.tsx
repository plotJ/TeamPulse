"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp } from 'lucide-react'
import { Comments } from "@/components/comments"

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface Update {
  id: number;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  hoursWorked: string;
  accomplishments: string;
  problems: string;
  questions: string;
  timestamp: string;
  focus: string;
  project: string;
  comments: Comment[];
}

interface FeedProps {
  updates: Update[];
  activeFocus?: string;
  activeProject?: string;
  activeTeamMember?: string;
  onAddComment: (updateId: number, content: string) => void;
}

export function Feed({ updates, activeFocus, activeProject, activeTeamMember, onAddComment }: FeedProps) {
  const getFeedTitle = () => {
    if (activeTeamMember) {
      return `Updates from ${activeTeamMember}`
    }
    if (activeProject && activeProject !== "All") {
      return `Updates - ${activeProject}${activeFocus && activeFocus !== "All" ? ` / ${activeFocus}` : ""}`
    }
    if (activeFocus && activeFocus !== "All") {
      return `Updates - ${activeFocus}`
    }
    return "All Updates"
  }

  const filteredUpdates = updates.filter(update => {
    if (activeFocus && activeFocus !== "All" && update.focus !== activeFocus) return false;
    if (activeProject && activeProject !== "All" && update.project !== activeProject) return false;
    if (activeTeamMember && update.author.name !== activeTeamMember) return false;
    return true;
  });

  return (
    <div className="space-y-6 min-h-[calc(100vh-20rem)]">
      <h2 className="text-2xl font-bold">{getFeedTitle()}</h2>
      {filteredUpdates.length === 0 ? (
        <Card className="h-full flex items-center justify-center">
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">No updates to display</p>
          </CardContent>
        </Card>
      ) : (
        filteredUpdates.map((update) => (
          <Card key={update.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4 space-y-0 pb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={update.author.avatar} alt={update.author.name} />
                <AvatarFallback>{update.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{update.author.name}</h3>
                    <p className="text-sm text-muted-foreground">{update.author.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">{update.timestamp}</span>
                    {(!activeProject || activeProject === "All") && (
                      <p className="text-sm font-medium">{update.project}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hours Worked */}
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Hours worked</div>
                <div className="text-lg font-semibold">{update.hoursWorked}h</div>
              </div>

              {/* Accomplishments */}
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Accomplishments</div>
                <p className="text-sm">{update.accomplishments}</p>
              </div>

              {/* Problems (if any) */}
              {update.problems && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Problems encountered</div>
                  <p className="text-sm">{update.problems}</p>
                </div>
              )}

              {/* Questions (if any) */}
              {update.questions && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Questions</div>
                  <p className="text-sm">{update.questions}</p>
                </div>
              )}
            </CardContent>
            <Separator />
            <CardFooter className="py-4">
              <div className="flex space-x-4 w-full">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <div className="flex-1">
                  <Comments
                    updateId={update.id}
                    comments={update.comments}
                    onAddComment={onAddComment}
                  />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
