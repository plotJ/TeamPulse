"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, ChevronUp, ChevronDown } from "lucide-react"
import { Update } from "@/types"
import { Comments } from "@/components/comments"

interface FeedProps {
  updates: Update[];
  activeFocus?: string;
  activeProject?: string;
  activeTeamMember?: string;
  onAddComment: (updateId: number, content: string) => void;
}

export function Feed({ updates, activeFocus, activeProject, activeTeamMember, onAddComment }: FeedProps) {
  const [expandedUpdates, setExpandedUpdates] = useState<Set<number>>(new Set());

  // Initialize expanded state when updates change
  useEffect(() => {
    setExpandedUpdates(new Set(updates.map(u => u.id)));
  }, [updates]);

  const toggleUpdate = (updateId: number) => {
    setExpandedUpdates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(updateId)) {
        newSet.delete(updateId);
      } else {
        newSet.add(updateId);
      }
      return newSet;
    });
  };

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
    if (activeFocus && activeFocus.toLowerCase() !== "all" && update.focus.toLowerCase() !== activeFocus.toLowerCase()) return false;
    if (activeProject && activeProject.toLowerCase() !== "all" && update.project.toLowerCase() !== activeProject.toLowerCase()) return false;
    if (activeTeamMember && update.teamMemberId !== activeTeamMember) return false;
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
          <Card 
            key={update.id} 
            className="relative overflow-hidden hover:shadow-md transition-shadow"
            style={{ backgroundColor: update.author.color }}
          >
            <CardHeader className="flex flex-row items-center space-x-4 space-y-0 pb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={update.author.avatar} alt={update.author.name} />
                <AvatarFallback>{update.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{update.author.name}</h3>
                    <p className="text-sm text-muted-foreground">{update.author.role} • {update.timestamp}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleUpdate(update.id)}
                    className="ml-2"
                  >
                    {expandedUpdates.has(update.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">Hours: {update.hoursWorked}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{update.project}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{update.focus}</span>
                </div>
              </div>
            </CardHeader>
            {expandedUpdates.has(update.id) && (
              <>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold">Accomplishments</h4>
                      <p className="mt-1">{update.accomplishments}</p>
                    </div>
                    {update.problems && (
                      <div>
                        <h4 className="text-sm font-semibold">Problems</h4>
                        <p className="mt-1">{update.problems}</p>
                      </div>
                    )}
                    {update.questions && (
                      <div>
                        <h4 className="text-sm font-semibold">Questions</h4>
                        <p className="mt-1">{update.questions}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-0">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Like</span>
                    </Button>
                  </div>
                </CardFooter>
                <Separator />
                <Comments 
                  comments={update.comments} 
                  onAddComment={(content) => onAddComment(update.id, content)}
                />
              </>
            )}
          </Card>
        ))
      )}
    </div>
  )
}
