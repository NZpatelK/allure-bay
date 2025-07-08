'use client';
import { useEffect, useState } from 'react';
import perfume from '@/assets/perfume.png';
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";


type Category = {
    slug: string;
    name: string;
    url: string;
};

interface sidenavProps {
    screenWidth: (value: number) => void,
    toggleSidebar: (value: boolean) => void
}

export default function Sidenav({ screenWidth, toggleSidebar }: sidenavProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sideNavScreenWidth, setSideNavScreenWidth] = useState(0);

    useEffect(() => {
        async function fetchCategories() {
            const res = await fetch('https://dummyjson.com/products/categories');
            if (!res.ok) throw new Error('Failed to fetch categories');
            const data: Category[] = await res.json();
            setCategories(data);
        }
        fetchCategories();
    }, []);


    useEffect(() => {
        const handleResize = () => {
            setSideNavScreenWidth(window.innerWidth);
            screenWidth(window.innerWidth);
        };

        handleResize(); // run once on mount
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // ✅ Add empty dependency array

    const handletoggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        toggleSidebar(!isCollapsed);
    }

    return (
        <div className={`${!isCollapsed ? "w-20" : "w-full sm:w-60"} bg-[#263238] transition-all duration-500 ease-in-out fixed z-10 top-0 left-0 h-screen shadow-right`}>

            <div className="flex items-center pt-4 px-4 w-full">
                <button
                    className="bg-white text-center min-w-[50px] h-10 rounded-sm text-xs font-bold cursor-pointer text-gray-600"
                    onClick={() => handletoggleSidebar()}
                >
                    A-Bay
                </button>


                <AnimatePresence mode="wait">
                    {isCollapsed && (
                        <motion.div
                            className="ml-4 whitespace-nowrap inline-block text-md font-semibold text-white"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            Allure Bay
                        </motion.div>
                    )}
                </AnimatePresence>


                {isCollapsed && (
                    <button
                        className="ml-auto w-10 h-10 rounded-md bg-transparent cursor-pointer text-white"
                        onClick={() => handletoggleSidebar()}
                    >
                        X
                    </button>
                )}
            </div>


            <ul className="categories list-none p-4 flex flex-col items-center h-full sidenav-height">
                {categories.map((category) => (
                    <li key={category.slug} className="w-full mb-4">
                        <a
                            href={category.url}
                            className="flex items-center h-10 text-gray-100 no-underline transition-all duration-300 ease-in-out rounded-md hover:bg-white hover:text-gray-800 cursor-pointer"
                        >
                            <Image
                                className="px-2"
                                src={perfume}
                                width={40}
                                height={40}
                                alt={category.name}
                            />

                            {/* Wrap just this animated span in AnimatePresence */}
                            <AnimatePresence mode="wait">
                                {isCollapsed && (
                                    <motion.span
                                        key={category.slug}
                                        className="ml-2 whitespace-nowrap inline-block"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        {category.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </a>
                    </li>
                ))}

            </ul>


        </div>
    );
}
