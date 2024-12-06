"use client"

import { SiteHeader } from "@/components/site-header"

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">About TeamPulse</h1>
        <p className="text-lg text-muted-foreground">
          TeamPulse is a real-time team collaboration and productivity tracking platform.
          More content coming soon!
        </p>
      </div>
    </div>
  )
}
