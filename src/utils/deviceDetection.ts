export const isMobile = () => {
  // For development/testing on desktop, return true
  // When you're ready to deploy, change this to false
  const bypassDetection = process.env.NEXT_PUBLIC_BYPASS_DEVICE_DETECTION === 'false';

  if (bypassDetection) return true;

  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768;
};
