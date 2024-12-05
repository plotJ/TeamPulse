import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <div className="w-64 border-r bg-background">
        <Skeleton className="h-14 w-full" />
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="border-b">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
        <div className="p-8">
          <div className="space-y-8 max-w-[1600px] w-full mx-auto">
            <Skeleton className="h-32 w-full" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
