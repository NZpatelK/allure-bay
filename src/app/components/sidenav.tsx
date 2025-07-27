'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation'; // For persistent highlight

// Image imports
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
    const pathname = usePathname();

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
            console.log(categories.length, 'categories length'); // Debugging log
            if (categories.length > 0) return; // Avoid fetching if already loaded
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
    }, [categories]);

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

    const toggleMenu = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        toggleSidebar(newState);
    };

    return (
        <div className={`${!isCollapsed ? "w-0 md:w-20" : "w-full sm:w-60"} bg-[#e63946] transition-all duration-500 ease-in-out fixed z-10 top-0 left-0 h-screen shadow-right`}>
            <div className="relative flex items-center pt-4 px-4 w-full h-16">
                {/* Sidebar Label */}
                <AnimatePresence mode="wait">
                    {isCollapsed && (
                        <motion.div
                            key="label"
                            className="ml-4 text-lg whitespace-nowrap inline-block font-semibold text-white"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            Allure Bay
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Button wrapper for movement */}
                <motion.div
                    key="toggle-wrapper"
                    className="absolute top-4"
                    initial={false}
                    animate={{
                        left: (sideNavScreenWidth > 768) ? isCollapsed ? "70%" : "20%" : isCollapsed ? "85%" : "50%",
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 80 }}
                >
                    <button
                        onClick={toggleMenu}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-md"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={isCollapsed ? 'open' : 'closed'}
                            variants={{
                                closed: { rotate: 0, y: -6 },
                                open: { rotate: 45, y: 0 },
                            }}
                            transition={{ duration: 0.3 }}
                            className="absolute w-6 h-0.5 bg-black"
                        />
                        <motion.span
                            animate={isCollapsed ? 'open' : 'closed'}
                            variants={{
                                closed: { opacity: 1 },
                                open: { opacity: 0 },
                            }}
                            transition={{ duration: 0.3 }}
                            className="absolute w-6 h-0.5 bg-black"
                        />
                        <motion.span
                            animate={isCollapsed ? 'open' : 'closed'}
                            variants={{
                                closed: { rotate: 0, y: 6 },
                                open: { rotate: -45, y: 0 },
                            }}
                            transition={{ duration: 0.3 }}
                            className="absolute w-6 h-0.5 bg-black"
                        />
                    </button>
                </motion.div>
            </div>

            <ul className="categories list-none p-4 flex flex-col items-center h-full sidenav-height">
                {categories.map((category, index) => {
                    const isActive = pathname.includes(category.slug);
                    return (
                        <li key={category.slug} className="w-full mb-4">
                            <Link href={`/products/${category.slug}`} passHref>
                                <div
                                    className={`
                                        flex items-center h-10 text-gray-100 transition-all duration-300 ease-in-out rounded-md cursor-pointer
                                        ${isActive ? "bg-white text-gray-800 font-semibold" : "hover:bg-white hover:text-gray-800"}
                                    `}
                                >
                                    <Image
                                        className="pl-2 py-4"
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
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                                            >
                                                {category.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
