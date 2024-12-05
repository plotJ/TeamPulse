"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp } from "lucide-react"

interface UpdateCreatorProps {
  activeFocus: string;
  activeProject: string;
  onSubmit: (update: UpdateData) => void;
}

interface UpdateData {
  hoursWorked: string;
  accomplishments: string;
  problems: string;
  questions: string;
}

export function UpdateCreator({ activeFocus, activeProject, onSubmit }: UpdateCreatorProps) {
  const [updateData, setUpdateData] = useState<UpdateData>({
    hoursWorked: "",
    accomplishments: "",
    problems: "",
    questions: "",
  })
  const [isExpanded, setIsExpanded] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(updateData)
    setUpdateData({ hoursWorked: "", accomplishments: "", problems: "", questions: "" })
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-4">
          <CardTitle className="text-xl">Post Update</CardTitle>
          {!isExpanded && <span className="text-sm text-muted-foreground">for {activeProject} / {activeFocus}</span>}
        </div>
        <Button 
          variant="outline"
          size="default"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`h-9 px-4 hover:bg-primary hover:text-primary-foreground transition-colors ${!isExpanded ? 'bg-primary/10' : ''}`}
        >
          {isExpanded ? (
            <div className="flex items-center gap-2">
              <ChevronUp className="h-5 w-5" />
              <span>Collapse</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ChevronDown className="h-5 w-5" />
              <span>Expand</span>
            </div>
          )}
        </Button>
      </CardHeader>
      {isExpanded && (
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-3">
              {/* Hours Worked */}
              <div className="space-y-0.5">
                <Label htmlFor="hoursWorked" className="text-sm">Hours worked</Label>
                <Input
                  id="hoursWorked"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="Hours"
                  value={updateData.hoursWorked}
                  onChange={(e) => setUpdateData({ ...updateData, hoursWorked: e.target.value })}
                  className="h-8 w-32"
                  required
                />
              </div>

              {/* Accomplishments */}
              <div className="space-y-0.5">
                <Label htmlFor="accomplishments" className="text-sm">What did you accomplish?</Label>
                <Input
                  id="accomplishments"
                  placeholder="Brief summary of accomplishments..."
                  value={updateData.accomplishments}
                  onChange={(e) => setUpdateData({ ...updateData, accomplishments: e.target.value })}
                  className="h-8"
                  required
                />
              </div>

              {/* Problems */}
              <div className="space-y-0.5">
                <Label htmlFor="problems" className="text-sm">Any problems encountered?</Label>
                <Input
                  id="problems"
                  placeholder="Brief summary of problems..."
                  value={updateData.problems}
                  onChange={(e) => setUpdateData({ ...updateData, problems: e.target.value })}
                  className="h-8"
                />
              </div>

              {/* Questions */}
              <div className="space-y-0.5">
                <Label htmlFor="questions" className="text-sm">Questions for the team?</Label>
                <Input
                  id="questions"
                  placeholder="Any questions for the team..."
                  value={updateData.questions}
                  onChange={(e) => setUpdateData({ ...updateData, questions: e.target.value })}
                  className="h-8"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Post Update
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  )
}
