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
    })

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
    })

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
                <h1 className="text-4xl font-bold text-gray-800">{params.category}</h1>
                <div className="bg-gray-300 mr-6 mt-2 rounded-2xl products-height shadow-neutral-300 shadow-2xl  overflow-hidden">
                    <div className="flex flex-wrap gap-2 m-5">
                        {product.map((product) => (

                            <ProductCard product={product} key={product.id} />

                        ))}
                    </div>
                </div>

            </main>
        </main>
    );
}