"use client"

import { SiteHeader } from "@/components/site-header"

export default function PricingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">Pricing</h1>
        <p className="text-lg text-muted-foreground">
          Our pricing plans will be available soon. Stay tuned!
        </p>
      </div>
    </div>
  )
}
