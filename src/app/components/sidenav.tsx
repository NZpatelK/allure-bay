'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";

import perfume from '@/assets/fragrances.png';
import beauty from '@/assets/beauty.png';
import furniture from '@/assets/furniture.png';
import grocery from '@/assets/grocery.png';
import homeDecor from '@/assets/home-decoration.png';
import kitchenAccessories from '@/assets/kitchen-accessories.png';
import laptop from '@/assets/laptop.png';

type Category = {
    slug: string;
    name: string;
    url: string;
};

interface SidenavProps {
    screenWidth: (value: number) => void;
    toggleSidebar: (value: boolean) => void;
}

export default function Sidenav({ screenWidth, toggleSidebar }: SidenavProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sideNavScreenWidth, setSideNavScreenWidth] = useState(0);

    const icons = [
        perfume,
        beauty,
        furniture,
        grocery,
        homeDecor,
        kitchenAccessories,
        laptop
    ];

    useEffect(() => {
        async function fetchCategories() {
            const categoriesUrl = process.env.NEXT_PUBLIC_CATEGORIES_URL;
            if (!categoriesUrl) {
                throw new Error('NEXT_PUBLIC_CATEGORIES_URL is not defined');
            }
            const res = await fetch(categoriesUrl);
            if (!res.ok) throw new Error('Failed to fetch categories');
            const data: Category[] = await res.json();
            const reduceData = data.slice(0, 7);
            setCategories(reduceData);
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
    }, []);

    const handletoggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        toggleSidebar(newState);
    };

    return (
        <div className={`${!isCollapsed ? "w-20" : "w-full sm:w-60"} bg-blue-500 transition-all duration-500 ease-in-out fixed z-10 top-0 left-0 h-screen shadow-right`}>
            <div className="flex items-center pt-4 px-4 w-full">
                <button
                    className="bg-white text-center min-w-[50px] h-10 rounded-sm text-xs font-bold cursor-pointer text-gray-600"
                    onClick={handletoggleSidebar}
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
                        onClick={handletoggleSidebar}
                    >
                        X
                    </button>
                )}
            </div>

            <ul className="categories list-none p-4 flex flex-col items-center h-full sidenav-height">
                {categories.map((category, index) => (
                    <li key={category.slug} className="w-full mb-4">
                        <Link
                            href={`/products/${category.slug}`}
                            className="flex items-center h-10 text-gray-100 no-underline transition-all duration-300 ease-in-out rounded-md hover:bg-white hover:text-gray-800 cursor-pointer"
                        >
                            <Image
                                className="px-2"
                                src={icons[index % icons.length]}
                                width={40}
                                height={40}
                                alt={category.name}
                            />

                            <AnimatePresence mode="wait">
                                {isCollapsed && (
                                    <motion.span
                                        key={category.slug}
                                        className="ml-2 whitespace-nowrap inline-block"
                                        initial={{ opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeInOut" , delay: 0.2 } }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeInOut" } }}
                                        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                                    >
                                        {category.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
