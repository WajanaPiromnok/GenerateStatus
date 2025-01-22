export const isMobile = () => {
  const bypassDetection = process.env.NEXT_PUBLIC_BYPASS_DEVICE_DETECTION === 'false';
  if (bypassDetection) return true;
  
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};