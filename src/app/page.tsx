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
    <div className={`grid grid-rows-[20px_1fr_20px] bg-white items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}>
      <Sidenav
        screenWidth={(e) => setScreenWidth(e)}
        toggleSidebar={(e) => setSidebarOpen(e)}
      />
      <main className={`${mainClassName} transition-all duration-500 ease-in-out`}>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold text-gray-600">Welcome to Allure Bay</h1>
      </main>
    </div>
  );
}
