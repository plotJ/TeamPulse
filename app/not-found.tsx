import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-4">Could not find the requested page</p>
        <Link 
          href="/"
          className="text-primary hover:underline"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
