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
  // Today - January 12
  {
    id: 9,
    author: {
      name: "Jamie L.",
      avatar: "/avatars/placeholder.svg",
      role: "Product Designer",
      color: "#E6F3FF"
    },
    hoursWorked: "6",
    accomplishments: "Finalized user flow diagrams for authentication screens. Created high-fidelity mockups for password reset flow.",
    problems: "Need to align with marketing on brand guidelines for new screens",
    questions: "Can we schedule a design review with the team tomorrow?",
    timestamp: "2024-01-12 10:30",
    focus: "authentication",
    project: "user-management",
    comments: [],
    teamMemberId: "jamie"
  },
  {
    id: 8,
    author: {
      name: "Sarah M.",
      avatar: "/avatars/placeholder.svg",
      role: "Frontend Developer",
      color: "#E6FFE6"
    },
    hoursWorked: "7",
    accomplishments: "Implemented new authentication UI components. Added form validation and error handling for login/signup.",
    problems: "Found edge case with password validation rules",
    questions: "Should we add password strength indicator?",
    timestamp: "2024-01-12 11:15",
    focus: "authentication",
    project: "user-management",
    comments: [],
    teamMemberId: "sarah"
  },
  {
    id: 7,
    author: {
      name: "Tom Wilson",
      avatar: "/avatars/placeholder.svg",
      role: "Marketing",
      color: "#FFF3E6"
    },
    hoursWorked: "5",
    accomplishments: "Created content for onboarding emails. Drafted copy for authentication error messages.",
    problems: "Need to ensure error messages are user-friendly yet secure",
    questions: "Can we A/B test different welcome email versions?",
    timestamp: "2024-01-12 14:00",
    focus: "marketing",
    project: "feature-launch",
    comments: [],
    teamMemberId: "tom"
  },

  // Yesterday - January 11
  {
    id: 6,
    author: {
      name: "Jamie L.",
      avatar: "/avatars/placeholder.svg",
      role: "Product Designer",
      color: "#E6F3FF"
    },
    hoursWorked: "7",
    accomplishments: "Created wireframes for 2FA setup process. Conducted user interviews about authentication pain points.",
    problems: "Users finding current 2FA setup process confusing",
    questions: "Should we add a skip option for 2FA during initial signup?",
    timestamp: "2024-01-11 09:45",
    focus: "authentication",
    project: "user-management",
    comments: [],
    teamMemberId: "jamie"
  },
  {
    id: 5,
    author: {
      name: "Sarah M.",
      avatar: "/avatars/placeholder.svg",
      role: "Frontend Developer",
      color: "#E6FFE6"
    },
    hoursWorked: "8",
    accomplishments: "Set up OAuth integration with Google and GitHub. Added loading states and animations to auth forms.",
    problems: "OAuth redirect flow needs optimization",
    questions: "Which OAuth providers should we prioritize next?",
    timestamp: "2024-01-11 16:30",
    focus: "authentication",
    project: "user-management",
    comments: [],
    teamMemberId: "sarah"
  },
  {
    id: 4,
    author: {
      name: "Tom Wilson",
      avatar: "/avatars/placeholder.svg",
      role: "Marketing",
      color: "#FFF3E6"
    },
    hoursWorked: "6",
    accomplishments: "Created landing page copy highlighting new security features. Started social media campaign about improved auth.",
    problems: "Need more specific metrics about current auth pain points for marketing",
    questions: "Can we get some user testimonials about the new auth features?",
    timestamp: "2024-01-11 13:20",
    focus: "marketing",
    project: "feature-launch",
    comments: [],
    teamMemberId: "tom"
  },

  // Two days ago - January 10
  {
    id: 3,
    author: {
      name: "Jamie L.",
      avatar: "/avatars/placeholder.svg",
      role: "Product Designer",
      color: "#E6F3FF"
    },
    hoursWorked: "4",
    accomplishments: "Completed user research for new authentication flow. Created initial design system components for auth screens.",
    problems: "Need to ensure accessibility standards are met",
    questions: "When can we schedule the first design review?",
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
    accomplishments: "Set up new auth component library. Started implementing responsive design for auth forms.",
    problems: "Need to optimize form submission performance",
    questions: "Should we implement progressive form validation?",
    timestamp: "2024-01-10 10:30",
    focus: "authentication",
    project: "user-management",
    comments: [],
    teamMemberId: "sarah"
  },
  {
    id: 1,
    author: {
      name: "Tom Wilson",
      avatar: "/avatars/placeholder.svg",
      role: "Marketing",
      color: "#FFF3E6"
    },
    hoursWorked: "5",
    accomplishments: "Drafted marketing strategy for new auth features. Created initial social media campaign outline.",
    problems: "Need more visual assets for campaign",
    questions: "What's our target launch date for the new auth system?",
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
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <SidebarProvider>
        <div className="flex flex-1">
          <SidebarContainer 
            onTeamMemberSelect={handleTeamMemberChange} 
            selectedTeamMember={filters.teamMemberId || ""}
          />
          <SidebarInset className="flex-1">
            <div className="flex flex-col h-full">
              <MainNav 
                projects={projects}
                focuses={focuses}
                updates={updates}
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
      </SidebarProvider>
    </div>
  )
}
