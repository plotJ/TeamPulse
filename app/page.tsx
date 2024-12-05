"use client"

import { useState } from "react"
import { TeamSidebar } from "@/components/team-sidebar"
import { UpdateCreator } from "@/components/update-creator"
import { Feed } from "@/components/feed"
import { MainNav } from "@/components/main-nav"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Project {
  title: string;
  id: string;
}

interface Focus {
  title: string;
  id: string;
  projectId: string;
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
  comments?: {
    id: number;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
  }[];
  teamMemberId?: string;
}

interface FilterState {
  teamMemberId?: string;
  project?: string;
  focus?: string;
}

const initialUpdates = [
  {
    id: 1,
    author: {
      name: "Jamie L.",
      avatar: "/avatars/01.png",
      role: "Product Designer"
    },
    hoursWorked: "6",
    accomplishments: "Completed user authentication flow designs",
    problems: "",
    questions: "Should we add social login options?",
    timestamp: "4 hours ago",
    focus: "Authentication",
    project: "User Management",
    teamMemberId: "jamie"
  },
  {
    id: 2,
    author: {
      name: "Clara S.",
      avatar: "/avatars/02.png",
      role: "Developer"
    },
    hoursWorked: "8",
    accomplishments: "Implemented user authentication backend",
    problems: "Encountered issues with password hashing",
    questions: "What's our policy on password complexity?",
    timestamp: "5 hours ago",
    focus: "Authentication",
    project: "User Management",
    teamMemberId: "clara"
  },
  {
    id: 3,
    author: {
      name: "Tom Wilson",
      avatar: "/avatars/03.png",
      role: "Marketing"
    },
    hoursWorked: "4",
    accomplishments: "Drafted email campaign for new feature launch",
    problems: "Need more details on feature benefits",
    questions: "",
    timestamp: "2 hours ago",
    focus: "Marketing",
    project: "Feature Launch",
    teamMemberId: "tom"
  }
]

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [focuses, setFocuses] = useState<Focus[]>([])
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

  const handleUpdateSubmit = (newUpdate: Omit<Update, 'id' | 'author'>) => {
    const update: Update = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "/placeholder-avatar.jpg",
        role: "Software Engineer"
      },
      hoursWorked: newUpdate.hoursWorked,
      accomplishments: newUpdate.accomplishments,
      problems: newUpdate.problems,
      questions: newUpdate.questions,
      timestamp: new Date().toLocaleString(),
      focus: activeFocus,
      project: activeProject,
      comments: []
    }
    setUpdates([update, ...updates])
  }

  const handleAddComment = (updateId: number, content: string) => {
    setUpdates(prevUpdates => prevUpdates.map(update => {
      if (update.id === updateId) {
        return {
          ...update,
          comments: [
            ...(update.comments || []),
            {
              id: Date.now(),
              author: {
                name: "Current User",
                avatar: "/placeholder-avatar.jpg"
              },
              content,
              timestamp: new Date().toLocaleString()
            }
          ]
        }
      }
      return update
    }))
  }

  const handleTeamMemberChange = (teamMemberId: string) => {
    // Team member selection overrides project and focus filters
    setFilters({ teamMemberId })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        <TeamSidebar onTeamMemberSelect={handleTeamMemberChange} />
        <SidebarInset className="flex-1">
          <div className="flex flex-col h-full min-h-screen bg-background">
            <MainNav 
              projects={projects}
              focuses={focuses}
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
                  updates={updates}
                  activeFocus={activeFocus} 
                  activeProject={activeProject}
                  activeTeamMember={filters.teamMemberId ? updates.find(u => u.teamMemberId === filters.teamMemberId)?.author.name : undefined}
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
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Project name"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProjectOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProject}>Add Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Focus Dialog */}
      <Dialog open={isAddFocusOpen} onOpenChange={setIsAddFocusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Focus Area</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Focus area name"
              value={newFocusTitle}
              onChange={(e) => setNewFocusTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFocusOpen(false)}>Cancel</Button>
            <Button onClick={handleAddFocus}>Add Focus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
