import GenerateStatus from '@/components/GenerateStatus'
import DeviceRedirect from '@/components/DeviceRedirect'
import GradientBackground from '../components/GradientBackground';
import TestGetData from '@/components/TestGetData';

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