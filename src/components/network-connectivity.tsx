import { useEffect, useState } from 'react'
import * as React from 'react'
import { ChartLineIcon } from 'lucide-react'

export const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div
      className={`ml-auto flex items-center ${
        isOnline ? 'text-green-500' : 'text-red-500 '
      }`}
    >
      <ChartLineIcon className="mr-2 bg-green" size={14} />
      <div className="ml-auto">{isOnline ? 'Connected' : 'Not Connected'}</div>
    </div>
  )
}
