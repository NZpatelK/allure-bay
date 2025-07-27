'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Sidenav from "./components/sidenav";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [product, setProduct] = useState([]);
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

  // Fetch products on mount
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('https://dummyjson.com/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProduct(data.products);
    }
    fetchProducts();
  }, []);

  // Determine class based on current state
  const mainClassName = isSidebarOpen && screenWidth > 768
    ? "body-trimmed"
    : "body-md-screen";

  return (
    <main className="flex pt-10 bg-gray-100 min-h-screen w-full p-0 m-0">
      <Sidenav
        screenWidth={(e) => setScreenWidth(e)}
        toggleSidebar={(e) => setSidebarOpen(e)}
      />
      <main className={`${mainClassName} transition-all duration-500 ease-in-out`}>
        <h1 className="text-4xl font-bold text-gray-800 px-4 capitalize">Allure Bay</h1>

        <div className=" mt-2 rounded-2xl overflow-hidden w-full px-0">
          {/* ✅ FLEX GRID with NO OUTER GAP */}
          <div className="flex flex-wrap w-full p-0 m-0">
            {product.map((product, index) => (
              <div
                key={product?.id || index}
                className=" w-11/12 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5  2xl:w-1/6 p-1 box-border transition-all duration-300 ease-in-out"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </main>
  );
}
