'use client'
 
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-4">We apologize for the inconvenience</p>
        <Button
          onClick={reset}
          variant="outline"
          className="min-w-[100px]"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
