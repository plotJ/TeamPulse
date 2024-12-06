"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface BlogPost {
  id: number
  title: string
  description: string
  date: string
  author: {
    name: string
    avatar: string
    role: string
  }
  tags: string[]
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Introducing TeamPulse: Real-time Team Collaboration",
    description: "Learn how TeamPulse is revolutionizing the way teams work together with real-time updates, focus tracking, and seamless communication.",
    date: "January 12, 2024",
    author: {
      name: "Jamie L.",
      avatar: "/avatars/placeholder.svg",
      role: "Product Designer"
    },
    tags: ["Product Update", "Collaboration", "Team Management"],
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Best Practices for Daily Team Updates",
    description: "Discover how to write effective daily updates that keep your team informed and aligned. Tips from our experience building TeamPulse.",
    date: "January 10, 2024",
    author: {
      name: "Sarah M.",
      avatar: "/avatars/placeholder.svg",
      role: "Frontend Developer"
    },
    tags: ["Best Practices", "Team Communication", "Productivity"],
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "The Future of Remote Team Collaboration",
    description: "Our vision for the future of remote work and how TeamPulse is building tools to support distributed teams around the world.",
    date: "January 8, 2024",
    author: {
      name: "Tom Wilson",
      avatar: "/avatars/placeholder.svg",
      role: "Marketing"
    },
    tags: ["Remote Work", "Future of Work", "Team Culture"],
    readTime: "6 min read"
  }
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="space-y-2 text-center mb-12">
            <h1 className="text-3xl font-bold">TeamPulse Blog</h1>
            <p className="text-muted-foreground">
              Insights, updates, and best practices for team collaboration
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="block transition-transform hover:-translate-y-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{post.author.name}</span>
                        <span className="text-xs text-muted-foreground">{post.author.role}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
