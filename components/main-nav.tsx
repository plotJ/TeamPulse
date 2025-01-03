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
    // Simply count all updates for this project, regardless of any other state
    return updates.filter(update => 
      update.project.toLowerCase() === projectId.toLowerCase()
    ).length;
  };

  const getFocusUpdateCount = (focusId: string) => {
    // For "all" focuses within a project, show total updates for that project
    if (focusId === "all") {
      return updates.filter(update => 
        update.project.toLowerCase() === activeProject.toLowerCase()
      ).length;
    }

    // For specific focus, only count updates that match this focus AND its project
    return updates.filter(update => 
      update.focus.toLowerCase() === focusId.toLowerCase() &&
      update.project.toLowerCase() === activeProject.toLowerCase()
    ).length;
  };

  // Get focuses for the current project
  const projectFocuses = focuses.filter(focus => 
    activeProject === "all" ? false : focus.projectId.toLowerCase() === activeProject.toLowerCase()
  );

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
