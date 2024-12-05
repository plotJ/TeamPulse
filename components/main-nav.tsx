"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

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
  projects: Project[];
  focuses: Focus[];
  activeProject: string;
  activeFocus: string;
  onProjectChange: (project: string) => void;
  onFocusChange: (focus: string) => void;
  onAddProject: () => void;
  onAddFocus: () => void;
}

export function MainNav({ 
  projects, 
  focuses, 
  activeProject, 
  activeFocus, 
  onProjectChange, 
  onFocusChange,
  onAddProject,
  onAddFocus 
}: MainNavProps) {
  const pathname = usePathname()

  // Get focuses for the active project
  const projectFocuses = focuses.filter(focus => focus.projectId === activeProject)

  return (
    <div className="border-b">
      {/* Projects Navigation */}
      <div className="flex h-14 items-center px-4 border-b gap-2">
        <nav className="flex items-center gap-2 flex-1">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onProjectChange("all");
            }}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
              "h-8 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
              activeProject === "all" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            Projects
          </Link>
          {projects.filter(project => project.title !== "All").map((project) => (
            <Link
              key={project.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onProjectChange(project.id);
              }}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
                "h-8 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                activeProject === project.id ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              {project.title}
            </Link>
          ))}
        </nav>
        <Button variant="outline" size="sm" className="h-8 shrink-0" onClick={onAddProject}>
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </Button>
      </div>

      {/* Focus Area Tabs */}
      <div className="px-4 py-2 flex items-center gap-2">
        <nav className="flex items-center gap-2 flex-1">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onFocusChange("all");
            }}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
              "h-8 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
              activeFocus === "all" ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              (!activeProject || activeProject === "all") && "opacity-50 pointer-events-none"
            )}
          >
            Focuses
          </Link>
          {projectFocuses.map((focus) => (
            <Link
              key={focus.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onFocusChange(focus.id);
              }}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
                "h-8 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                activeFocus === focus.id ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              {focus.title}
            </Link>
          ))}
        </nav>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 shrink-0"
          onClick={onAddFocus}
          disabled={!activeProject || activeProject === "all"}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Focus
        </Button>
      </div>
    </div>
  )
}
