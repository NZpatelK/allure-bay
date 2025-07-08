'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Sidenav from "./components/sidenav";

export default function Home() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);


  // Optionally update screenWidth on mount
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine class based on current state
  const mainClassName = isSidebarOpen && screenWidth > 768
    ? "body-trimmed"
    : "body-md-screen";

  return (
    <main className="flex pt-10 bg-gray-100 h-screen">
      <Sidenav
        screenWidth={(e) => setScreenWidth(e)}
        toggleSidebar={(e) => setSidebarOpen(e)}
      />
      <main className={`${mainClassName} transition-all duration-500 ease-in-out`}>
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Allure Bay</h1>
      </main>
    </main>
  );
}
