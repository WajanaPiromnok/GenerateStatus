'use client'

import { useEffect, useState } from 'react'
import { isMobile } from '@/utils/deviceDetection'

export default function DeviceRedirect() {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Check device type on component mount and window resize
    const handleResize = () => {
      setShowWarning(!isMobile())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!showWarning) return null

  return (
    <div className="fixed inset-0 bg-gray-900 text-white flex items-center justify-center p-8 z-50">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Mobile Only Application</h1>
        <p className="mb-4">This application is designed for mobile devices only. Please access it from your smartphone or tablet.</p>
        <p className="text-sm opacity-75">Current device width: {typeof window !== 'undefined' ? window.innerWidth : 0}px</p>
      </div>
    </div>
  )
}