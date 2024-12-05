"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Update } from "@/types"

interface Project {
  title: string;
  id: string;
}

interface Focus {
  title: string;
  id: string;
  projectId: string;
}

interface MainNavProps {
  projects: Project[]
  focuses: Focus[]
  updates: Update[]
  activeProject: string
  activeFocus: string
  onProjectChange: (projectId: string) => void
  onFocusChange: (focusId: string) => void
  onAddProject: () => void
  onAddFocus: () => void
}

export function MainNav({
  projects,
  focuses,
  updates,
  activeProject,
  activeFocus,
  onProjectChange,
  onFocusChange,
  onAddProject,
  onAddFocus,
}: MainNavProps) {
  const getProjectUpdateCount = (projectId: string) => {
    if (projectId === "all") {
      return updates.length;
    }
    return updates.filter(update => update.project === projectId).length;
  };

  const getFocusUpdateCount = (focusId: string) => {
    if (focusId === "all") {
      // When "all" focus is selected, show updates for the current project
      return updates.filter(update => update.project === activeProject).length;
    }
    // For specific focus, show updates that match both project and focus
    return updates.filter(update => update.focus === focusId).length;
  };

  const projectFocuses = activeProject === "all" 
    ? [] 
    : focuses.filter((focus) => focus.projectId === activeProject);

  return (
    <div className="border-b">
      {/* Projects Navigation */}
      <div className="flex h-14 items-center px-4 border-b gap-2">
        <nav className="flex items-center gap-2 flex-1">
          {projects.map((project) => (
            <Link
              key={project.id}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onProjectChange(project.id)
                if (project.id === "all") {
                  onFocusChange("all")
                }
              }}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
                "h-8 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                project.id === activeProject ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              {project.title} ({getProjectUpdateCount(project.id)})
            </Link>
          ))}
        </nav>
        <Button variant="outline" size="sm" className="h-8" onClick={onAddProject}>
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </Button>
      </div>

      {/* Focuses Navigation */}
      <div className="flex h-14 items-center px-4 gap-2">
        <nav className="flex items-center gap-2 flex-1">
          {activeProject !== "all" && (
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onFocusChange("all")
              }}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
                "h-8 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                activeFocus === "all" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              All Focuses ({getFocusUpdateCount("all")})
            </Link>
          )}
          {projectFocuses.map((focus) => (
            <Link
              key={focus.id}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onFocusChange(focus.id)
              }}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
                "h-8 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                focus.id === activeFocus ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              {focus.title} ({getFocusUpdateCount(focus.id)})
            </Link>
          ))}
        </nav>
        {activeProject !== "all" && (
          <Button variant="outline" size="sm" className="h-8" onClick={onAddFocus}>
            <Plus className="h-4 w-4 mr-1" />
            Add Focus
          </Button>
        )}
      </div>
    </div>
  )
}
