"use client"

import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"

interface TimeAgoProps {
  date: string | Date
}

export function TimeAgo({ date }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState<string>("")

  useEffect(() => {
    // Only set the time ago on the client side
    const dateObj = typeof date === "string" ? new Date(date) : date
    setTimeAgo(formatDistanceToNow(dateObj, { addSuffix: true }))

    // Update every minute
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(dateObj, { addSuffix: true }))
    }, 60000)

    return () => clearInterval(interval)
  }, [date])

  // Return empty string on initial render to avoid hydration mismatch
  if (!timeAgo) return null

  return <span>{timeAgo}</span>
}
