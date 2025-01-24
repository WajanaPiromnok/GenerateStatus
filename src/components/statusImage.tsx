import React from "react";
import Image from "next/image";
import { LineSeed } from "@/app/fonts";

interface StatusImageProps {
  imageSrc: string;
  alt: string;
  name?: string;
}

const StatusImage: React.FC<StatusImageProps> = ({
  imageSrc,
  alt,
  name = "",
}) => {
  return (
    <div className="relative w-full max-w-full max-h-screen aspect-[9/16] overflow-hidden shadow-lg">
      <Image src={imageSrc} alt={alt} fill className="object-cover" priority />

      {/* Custom Name Container */}
      {name && (
        <div className="absolute iphonese:bottom-16 iphone12pro:bottom-16 iphonexr:bottom-16 iphone14promax:bottom-16 ipadmini:bottom-24 ipadair:bottom-24 ipadpro:bottom-24 pixel7:bottom-16 samsungs8plus:bottom-12 samsungzfold:bottom-16 zenbookfold:bottom-24 surfacepro7:bottom-24 bottom-24 left-0 right-0 text-center z-10">
          <p
            className={`text-white iphonese:text-xs iphone12pro:text-xs  iphonexr:text-sm iphone14promax:text-sm ipadmini:text-base ipadair:text-base ipadpro:text-base pixel7:text-sm samsungs8plus:text-xs samsungzfold:text-xs iphonese:pb-3 iphone12pro:pb-4 iphonexr:pb-5 iphone14promax:pb-6 ipadair:pb-6 ipadmini:pb-6 pixel7:pb-5 samsungs8plus:pb-6 samsungzfold:pb-1.5 zenbookfold:pb-6 surfacepro7:pb-6 text-xs ${LineSeed.className}`}
          >
            {name}
          </p>
          <div>
            </div>
        </div>
      )}
    </div>
  );
};

export default StatusImage;
