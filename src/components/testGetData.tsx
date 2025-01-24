"use client";

import { useEffect } from "react";

interface User {
  name: string;
  age: number; // Store age as a number
  status: string;
}

interface JsonData {
  users: User[];
}

// Helper function to parse the age range
const parseAgeRange = (ageRange: string): number => {
  const [min, max] = ageRange.split(" - ").map((value) => parseInt(value, 10));
  return Math.round((min + max) / 2); // Calculate and return the average
};

const TestGetData = () => {
  useEffect(() => {
    // Load stored data from localStorage on page load
    const storedData = localStorage.getItem("jsonData");
    if (storedData) {
      const parsedData: JsonData = JSON.parse(storedData);

      // Process the age ranges in the stored data
      const processedData = {
        users: parsedData.users.map((user) => ({
          ...user,
          age: typeof user.age === "string" ? parseAgeRange(user.age) : user.age,
        })),
      };

      // Save the processed data to localStorage
      localStorage.setItem("jsonData", JSON.stringify(processedData));
    }

    const handleMessage = (event: MessageEvent) => {

      console.log("Message received in Next.js apps:", event.data);

      try {
        const parsedData: JsonData = JSON.parse(event.data);

        // Process the age ranges in the received data
        const processedData = {
          users: parsedData.users.map((user) => ({
            ...user,
            age: typeof user.age === "string" ? parseAgeRange(user.age) : user.age,
          })),
        };

        // Save the processed data to localStorage
        localStorage.setItem("jsonData", JSON.stringify(processedData));
        console.log(localStorage.getItem("jsonData"));
      } catch (error) {
        console.error("Failed to parse received data:", error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return <div>{/* No need to render anything in the component */}</div>;
};

export default TestGetData;