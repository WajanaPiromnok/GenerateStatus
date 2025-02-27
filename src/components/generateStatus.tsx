"use client";

import { useState, useEffect } from "react";
import DownloadNotification from "./downloadNotification";
import StatusImage from "./statusImage";
import { isMobile } from "@/utils/deviceDetection";
import { LineSeed } from "@/app/fonts";
import { literata } from "@/app/fonts";
import Download from "./svg/Download";
import Gift from "./svg/Gift";
import Logo from "./logo";

// Define types for our data structures
type RelationshipStatus =
  | "single"
  | "in a relationship"
  | "married"
  | "talking stage"
  | "undisclosed";

interface ApiResponse {
  age: number;
  status: RelationshipStatus;
  nickname: string;
}

interface JsonData {
  users: ApiResponse[];
}

interface AgeGeneration {
  min: number;
  max: number;
  label: string;
}

const AGE_GENERATIONS: Record<string, AgeGeneration> = {
  CHILDREN: {
    min: 0,
    max: 15,
    label: "Children",
  },
  YOUTH: {
    min: 16,
    max: 25,
    label: "Youth",
  },
  YOUNG_ADULT: {
    min: 26,
    max: 35,
    label: "Young Adult",
  },
  ADULT: {
    min: 36,
    max: 55,
    label: "Adult",
  },
  SENIOR: {
    min: 56,
    max: 100,
    label: "Senior",
  },
};

export default function GenerateStatus() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPortrait, setIsPortrait] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Check screen orientation
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // Function to fetch data from your API
  const fetchData = async () => {
    /* อย่าลืมเอาออก*/
    /*const jsonSetData = JSON.stringify({
      users: [{ name: "John Doe", age: 10, status: "undisclosed" }],});        
    localStorage.setItem("jsonData", jsonSetData)*/
    /* บรรทัดบน */
    try {
      setLoading(true);

      setTimeout(() => {
        const storedData = localStorage.getItem("jsonData");
        if (!storedData) throw new Error("No data found in localStorage");

        const parsedData: JsonData = JSON.parse(storedData);
        console.log("Fetched data from localStorage:", parsedData);

        setData({
          age: parsedData.users[0].age,
          status: parsedData.users[0].status,
          nickname: parsedData.users[0].nickname, // Just using the first user's name
        });
      }, 2000); // Delay for 2 seconds
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({
        age: 25,
        status: "in a relationship",
        nickname: "John Doe",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isMobile()) {
      fetchData();
    }
  }, []);

  // Helper function to determine generation based on age
  const getGeneration = (age: number): AgeGeneration => {
    const generation = Object.values(AGE_GENERATIONS).find(
      (gen) => age >= gen.min && age <= gen.max
    );
    return generation || AGE_GENERATIONS.ADULT;
  };

  const handleOpenCoupon = () => {
    window.open(
      "https://chiselda.ddns.net/prize-token/prize-token/api/verify?token=YWR2ZW50dXJlUHJpemU="
    );
    console.log("open coupon");
  };

  const isMobileDevice = (): boolean => {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  };

  // Function to get image path based on generation and status
  const getStatusImage = (age: number, status: RelationshipStatus): string => {
    const generation = getGeneration(age);

    console.log(
      `/images/${generation.label.toLowerCase()}/${status
        .toLowerCase()
        .replace(" ", "-")}.png`
    );
    // Replace these paths with your actual image paths
    return `/images/${generation.label.toLowerCase()}/${status
      .toLowerCase()
      .replace(" ", "-")}.png`;
  };
  const handleDownload = async (
    age: number,
    status: RelationshipStatus,
    name: string
  ) => {
    const imageUrl = getStatusImage(age, status);

    try {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // Create a new image object
      const img = new Image();
      img.crossOrigin = "anonymous"; // Important for handling CORS

      // Wait for image to load
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image
      ctx.drawImage(img, 0, 0);

      // Add the text if name is provided
      if (name) {
        // Ensure font is loaded
        const fontSize = Math.max(14, Math.floor(canvas.height * 0.0)); // Scale font size with canvas height
        await document.fonts.load(`${fontSize}px 'Line Seed'`);
        ctx.font = `${fontSize}px 'Line Seed'`;

        // Text settings
        ctx.fillStyle = "#fff"; // White color
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Calculate position (85% down the height)
        const textY = canvas.height * 0.82;

        // Add text stroke for visibility
        ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        ctx.lineWidth = fontSize * 0.1;
        ctx.strokeText(name, canvas.width / 2, textY);

        // Fill the text
        ctx.fillText(name, canvas.width / 2, textY);
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
          },
          "image/png",
          1.0
        );
      });

      // Create download link
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;

      const generation = getGeneration(age).label.toLowerCase();
      const filename = `${generation}-${status
        .toLowerCase()
        .replace(" ", "-")}.png`;
      link.download = filename;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      window.URL.revokeObjectURL(blobUrl);

      setShowNotification(true);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleDownloadToGallery = async (
    age: number,
    status: RelationshipStatus,
    name: string
  ) => {
    const imageUrl = getStatusImage(age, status);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (name) {
        const fontSize = Math.max(14, Math.floor(canvas.height * 0.025));
        await document.fonts.load(`${fontSize}px 'Line Seed'`);
        ctx.font = `${fontSize}px 'Line Seed'`;
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const textY = canvas.height * 0.795;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        ctx.lineWidth = fontSize * 0.1;
        ctx.strokeText(name, canvas.width / 2, textY);
        ctx.fillText(name, canvas.width / 2, textY);
      }

      const dataUrl = canvas.toDataURL("image/png");

      const blob = await (await fetch(dataUrl)).blob();
      const generation = getGeneration(age).label.toLowerCase();
      const file = new File(
        [blob],
        `${generation}-${status.toLowerCase().replace(" ", "-")}.png`,
        { type: "image/png" }
      );

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Download Image",
          text: "Save this image to your gallery!",
        });
      } else {
        const generation = getGeneration(age).label.toLowerCase();
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${generation}-${status
          .toLowerCase()
          .replace(" ", "-")}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setShowNotification(true);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (!isPortrait) {
    return (
      <div className="fixed inset-0 bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-6">
          <h2 className={`text-xl font-bold mb-4 ${LineSeed.className}`}>
            โปรดหมุนโทรศัพท์
          </h2>
          <p>เว็บไซต์นี้รองรับการเล่นผ่านแนวตั้งเท่านั้น</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DownloadNotification
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <div className="flex justify-between items-center mb-2 mt-4">
        <div>
          <Logo />
        </div>
      </div>
      <div className="flex-1 px-4 py-2 flex flex-col max-w-md mx-auto w-full">
        <div className="flex-1 overflow-auto">
          <div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500" />
              </div>
            ) : data ? (
              <div className="flex flex-col w-full">
                <div className="space-y-4">
                  <div className="text-center">
                    <div>
                      <button
                        onClick={() =>
                          isMobileDevice()
                            ? handleDownloadToGallery(
                                data.age,
                                data.status,
                                data.nickname
                              )
                            : handleDownload(data.age, data.status, data.nickname)
                        }
                        className="inline-flex items-center bg-dark-pink hover:bg-gray-100 iphonese:p-2 p-3 rounded-lg shadow-lg transition-all duration-200"
                        aria-label="Download image"
                      >
                        <Download className="w-6 h-6 ml-2" />
                        <p
                          className={`text-sm text-white ml-2 mr-2 ${literata.className}`}
                        >
                          Save...
                        </p>
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="relative w-full max-w-[70vw] shadow-lg mx-auto">
                      <StatusImage
                        imageSrc={getStatusImage(data.age, data.status)}
                        alt={`Visualization for ${data.status} - ${
                          getGeneration(data.age).label
                        }`}
                        name={data.nickname} // Add the name you want to display
                      />
                    </div>
                  </div>
                  <div className="pb-2 flex justify-center">
                    <div className="w-full max-w-[70vw] iphonese:max-w-[70vw] iphone12pro:max-w-[70vw] iphonexr:max-w-[70vw] ipadmini:max-w-[60vw] ipadpro:max-w-[50vw]">
                      <button
                        className={`w-full inline-flex items-center justify-center bg-dark-pink iphonese:p-2 p-3 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 ${literata.className}`}
                        onClick={handleOpenCoupon}
                      >
                        <Gift className="w-6 h-6 ml-2" />
                        <p
                          className={`text-sm text-white ml-2 mr-2 ${literata.className}`}
                        >
                          Coupon
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`text-center text-white ${LineSeed.className}`}>
                กำลังดาวน์โหลด
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
