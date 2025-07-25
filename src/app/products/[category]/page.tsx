'use client'
import { useEffect, useState } from "react";
import Sidenav from "../../components/sidenav"
import { useParams } from 'next/navigation';
import ProductCard from "@/app/components/ProductCard";

export default function Products() {
    const params = useParams();
    const [screenWidth, setScreenWidth] = useState(0);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [product, setProcuct] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        handleResize(); // initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        async function fetchCategories() {
            if (!process.env.NEXT_PUBLIC_PRODUCTS_BY_CATEGORY_URL) {
                throw new Error('NEXT_PUBLIC_PRODUCTS_BY_CATEGORY_URL is not defined');
            }
            const categoriesUrl = process.env.NEXT_PUBLIC_PRODUCTS_BY_CATEGORY_URL + params.category;
            const res = await fetch(categoriesUrl);
            if (!res.ok) throw new Error('Failed to fetch categories');
            const data = await res.json();
            setProcuct(data.products);
        }
        fetchCategories();
    }, [params.category]);

    const mainClassName = isSidebarOpen && screenWidth > 768
        ? "body-trimmed"
        : "body-md-screen";

    return (
        <main className="flex pt-10 bg-gray-100 min-h-screen w-full p-0 m-0">
            <Sidenav
                screenWidth={(e) => setScreenWidth(e)}
                toggleSidebar={(e) => setSidebarOpen(e)}
            />
            <main className={`${mainClassName} transition-all duration-500 ease-in-out w-full m-5`}>
                <h1 className="text-4xl font-bold text-gray-800 px-4 capitalize">{params.category?.toString().split('-').join(' ')}</h1>

                <div className=" mt-2 rounded-2xl overflow-hidden w-full px-0">
                    {/* ✅ FLEX GRID with NO OUTER GAP */}
                    <div className="flex flex-wrap w-full p-0 m-0">
                        {product.map((product, index) => (
                            <div
                                key={product?.id ||index }
                                className=" w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6  2xl:w-1/8 p-1 box-borde transition-all duration-300 ease-in-outr"
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
