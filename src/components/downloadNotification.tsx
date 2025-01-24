import { useEffect } from "react";
import { Check } from "lucide-react";
import { LineSeed } from "@/app/fonts";

interface NotificationProps {
  show: boolean;
  onClose: () => void;
}

const DownloadNotification: React.FC<NotificationProps> = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center space-x-2">
        <Check className="h-5 w-5 text-green-500" />
        <p className={`text-gray-800 text-sm font-medium ${LineSeed.className}`}>บันทึกภาพเรียบร้อยแล้ว</p>
      </div>
    </div>
  );
};

export default DownloadNotification;
