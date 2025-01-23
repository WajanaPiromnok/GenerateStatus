import GenerateStatus from '@/components/generateStatus'
import DeviceRedirect from '@/components/deviceRedirect'
import GradientBackground from '../components/gradientBackground';

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-auto">
      <GradientBackground>
      <div className={`container mx-auto px-4`}>
        <DeviceRedirect />
        <GenerateStatus />
      </div>
      </GradientBackground>
    </main>
  )
}