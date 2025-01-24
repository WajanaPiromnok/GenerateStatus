import GenerateStatus from '@/components/generateStatus'
import DeviceRedirect from '@/components/deviceRedirect'
import GradientBackground from '../components/gradientBackground';
import TestGetData from '@/components/testGetData';

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-auto">
      <GradientBackground>
      <div className={`container mx-auto px-4`}>
        <DeviceRedirect />
        <TestGetData />
        <GenerateStatus />
      </div>
      </GradientBackground>
      <p>hi</p>
    </main>
  )
}