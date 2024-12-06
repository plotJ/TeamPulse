"use client"

import { useState, useMemo } from "react"
import { TeamSidebar } from "@/components/team-sidebar"
import { UpdateCreator } from "@/components/update-creator"
import { Feed } from "@/components/feed"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { MainNav } from "@/components/main-nav"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Update, UpdateData } from "@/types"
import { WorkspaceChat } from "@/components/workspace-chat"
import { SiteHeader } from "@/components/site-header"
import { SidebarContainer } from "@/components/sidebar-container"

interface Project {
  title: string;
  id: string;
}

interface Focus {
  title: string;
  id: string;
  projectId: string;
}

interface FilterState {
  teamMemberId?: string;
  project?: string;
  focus?: string;
}

const initialUpdates: Update[] = [
  {
    id: 1,
    author: {
      name: "Jamie L.",
      avatar: "/avatars/placeholder.svg",
      role: "Product Designer",
      color: "#E6F3FF"
    },
    hoursWorked: "4",
    accomplishments: "Completed user research for new feature",
    problems: "None to report",
    questions: "When can we schedule the design review?",
    timestamp: "2024-01-10 09:00",
    focus: "authentication",
    project: "user-management",
    comments: [],
    teamMemberId: "jamie"
  },
  {
    id: 2,
    author: {
      name: "Sarah M.",
      avatar: "/avatars/placeholder.svg",
      role: "Frontend Developer",
      color: "#E6FFE6"
    },
    hoursWorked: "6",
    accomplishments: "Implemented responsive design for dashboard",
    problems: "Need to optimize performance",
    questions: "Should we use server-side rendering?",
    timestamp: "2024-01-10 10:30",
    focus: "marketing",
    project: "feature-launch",
    comments: [],
    teamMemberId: "sarah"
  },
  {
    id: 3,
    author: {
      name: "Tom Wilson",
      avatar: "/avatars/placeholder.svg",
      role: "Marketing",
      color: "#FFF3E6" // Light orange
    },
    hoursWorked: "3",
    accomplishments: "Created social media campaign",
    problems: "Need more visual assets",
    questions: "When is the launch date?",
    timestamp: "2024-01-10 11:00",
    focus: "marketing",
    project: "feature-launch",
    comments: [],
    teamMemberId: "tom"
  }
]

const initialProjects: Project[] = [
  { title: "All Projects", id: "all" },
  { title: "User Management", id: "user-management" },
  { title: "Feature Launch", id: "feature-launch" },
  { title: "Backend API", id: "backend-api" }
]

const initialFocuses: Focus[] = [
  { title: "Authentication", id: "authentication", projectId: "user-management" },
  { title: "Marketing", id: "marketing", projectId: "feature-launch" },
  { title: "Development", id: "development", projectId: "backend-api" },
  { title: "Research", id: "research", projectId: "feature-launch" }
]

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [focuses, setFocuses] = useState<Focus[]>(initialFocuses)
  const [activeProject, setActiveProject] = useState<string>("all")
  const [activeFocus, setActiveFocus] = useState<string>("all")
  const [updates, setUpdates] = useState<Update[]>(initialUpdates)
  const [filters, setFilters] = useState<FilterState>({})

  // Dialog states
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [isAddFocusOpen, setIsAddFocusOpen] = useState(false)
  const [newProjectTitle, setNewProjectTitle] = useState("")
  const [newFocusTitle, setNewFocusTitle] = useState("")

  const handleAddProject = () => {
    if (newProjectTitle.trim()) {
      const newProjectId = newProjectTitle.toLowerCase().replace(/\s+/g, '-')
      const newProject = {
        title: newProjectTitle,
        id: newProjectId,
      }
      setProjects([...projects, newProject])
      setNewProjectTitle("")
      setIsAddProjectOpen(false)
      setActiveProject(newProjectId)
    }
  }

  const handleAddFocus = () => {
    if (newFocusTitle.trim() && activeProject !== "all") {
      const newFocusId = newFocusTitle.toLowerCase().replace(/\s+/g, '-')
      const newFocus = {
        title: newFocusTitle,
        id: newFocusId,
        projectId: activeProject,
      }
      setFocuses([...focuses, newFocus])
      setNewFocusTitle("")
      setIsAddFocusOpen(false)
      setActiveFocus(newFocusId) // Select the newly created focus using its unique id
    }
  }

  const handleUpdateSubmit = (newUpdate: UpdateData) => {
    const update: Update = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "/avatars/placeholder.svg",
        role: "Software Engineer",
        color: "#F3E6FF"
      },
      hoursWorked: newUpdate.hoursWorked,
      accomplishments: newUpdate.accomplishments,
      problems: newUpdate.problems,
      questions: newUpdate.questions,
      timestamp: new Date().toLocaleString(),
      focus: activeFocus,
      project: activeProject,
      comments: [],
      teamMemberId: filters.teamMemberId
    }
    setUpdates([update, ...updates])
  }

  const handleAddComment = (updateId: number, content: string) => {
    setUpdates(prevUpdates => 
      prevUpdates.map(update => {
        if (update.id === updateId) {
          return {
            ...update,
            comments: [
              ...update.comments,
              {
                id: Date.now(),
                author: {
                  name: "Current User",
                  avatar: "/avatars/placeholder.svg",
                  role: "Software Engineer",
                  color: "#F3E6FF"
                },
                content,
                timestamp: new Date().toLocaleString(),
              },
            ],
          };
        }
        return update;
      })
    );
  }

  const handleTeamMemberChange = (teamMemberId: string) => {
    // Update filters while preserving project and focus selections
    setFilters(prevFilters => ({
      ...prevFilters,
      teamMemberId: teamMemberId === "" ? undefined : teamMemberId
    }));
  }

  // Filter updates based on selected team member, project, and focus
  const filteredUpdates = useMemo(() => {
    return updates.filter(update => {
      // Team member filter
      if (filters.teamMemberId && update.teamMemberId !== filters.teamMemberId) {
        return false;
      }
      
      // Project filter
      if (activeProject !== "all" && update.project !== activeProject) {
        return false;
      }

      // Focus filter
      if (activeFocus !== "all" && update.focus !== activeFocus) {
        return false;
      }

      return true;
    });
  }, [updates, filters.teamMemberId, activeProject, activeFocus]);

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <div className="flex flex-1">
          <SidebarContainer 
            onTeamMemberSelect={handleTeamMemberChange} 
            selectedTeamMember={filters.teamMemberId || ""}
          />
          <SidebarInset className="flex-1">
            <div className="flex flex-col h-full min-h-screen bg-background">
              <MainNav 
                projects={projects}
                focuses={focuses}
                updates={filteredUpdates}
                activeProject={activeProject}
                activeFocus={activeFocus}
                onProjectChange={setActiveProject}
                onFocusChange={setActiveFocus}
                onAddProject={() => setIsAddProjectOpen(true)}
                onAddFocus={() => setIsAddFocusOpen(true)}
              />
              <main className="flex-1 p-8 overflow-y-auto">
                <div className="space-y-8 max-w-[1600px] w-full mx-auto">
                  <UpdateCreator 
                    activeFocus={activeFocus} 
                    activeProject={activeProject}
                    onSubmit={handleUpdateSubmit} 
                  />
                  <Feed 
                    updates={filteredUpdates}
                    activeFocus={activeFocus} 
                    activeProject={activeProject}
                    activeTeamMember={filters.teamMemberId}
                    onAddComment={handleAddComment}
                  />
                </div>
              </main>
            </div>
          </SidebarInset>
        </div>

        {/* Add Project Dialog */}
        <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Project name"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleAddProject}>Add Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Focus Dialog */}
        <Dialog open={isAddFocusOpen} onOpenChange={setIsAddFocusOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Focus Area</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Focus area name"
                value={newFocusTitle}
                onChange={(e) => setNewFocusTitle(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleAddFocus}>Add Focus Area</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  )
}
