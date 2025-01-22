'use client'

import { useEffect, useState } from 'react'
import { isMobile } from '@/utils/deviceDetection'
import { LineSeed } from "@/app/fonts";

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
      <div className={`max-w-md text-center ${LineSeed.className}`}>
        <h1 className="text-2xl font-bold mb-4">สำหรับโทรศัพท์มือถือเท่านั้น</h1>
        <p className="mb-4">เว็บไซต์นี้ออกแบบมาเพื่อรองรับบนโทรศัพท์มือถือเท่านั้น โปรดเปลี่ยนอุปกรณ์ของคุณเป็น แท็บแล็ต หรือ โทรศัพท์มือถือ</p>
        <p className="text-sm opacity-75">ขนาดหน้าจอปัจจุบัน: {typeof window !== 'undefined' ? window.innerWidth : 0}px</p>
      </div>
    </div>
  )
}