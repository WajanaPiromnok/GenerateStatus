import { ReactNode } from 'react';

interface GradientBackgroundProps {
  children: ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-black fixed inset-0 overflow-auto">
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
