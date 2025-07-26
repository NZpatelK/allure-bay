'use client';

import Image from 'next/image';
import { Rating } from '@mui/material';
import type { Product } from './ProductCard';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa';

export default function ProductCard({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(0);
    const cardRef = useRef(null);

    const handleAdd = () => setQuantity(1);
    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => Math.max(0, q - 1));
    const handleCancel = () => setQuantity(0);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setQuantity(0);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const calcateDiscount = (price: number, discountPercentage: number) => {
        if (discountPercentage < 15) return price;
        const discount = (price * discountPercentage) / 100;
        return price - discount;
    };

    return (
        <div className=" relative rounded-lg shadow hover:shadow-md transition bg-white h-full flex flex-col justify-between w-full box-border">
            {product.discountPercentage >= 15 && <div className="ribbon text-sm">{product.discountPercentage.toFixed(0)}% off</div>}
            <div className="p-4">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="mt-4">
                    <h2 className="text-lg font-medium text-gray-800 truncate">{product.title}</h2>
                    <p className="text-base font-bold mt-1 text-gray-800">${calcateDiscount(product.price, product.discountPercentage).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
                        <span className="text-sm text-gray-600">({product.rating.toFixed(1)})</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{product.stock} in stock</p>
                </div>
            </div>
            <div
                ref={cardRef}
                className="p-4 rounded-b-lg w-full mx-auto bg-neutral-700 hover:bg-neutral-600 transition-all"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {quantity === 0 ? (
                        <motion.button
                            key="add-cart"
                            onClick={handleAdd}
                            initial={{ opacity: 0, rotateX: 90, y: 50 }}
                            animate={{ opacity: 1, rotateX: 0, y: 0 }}
                            exit={{ opacity: 0, rotateX: 90, y: 50 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="flex items-center gap-2 justify-center text-white text-lg w-full"
                        >
                            Add to Cart
                        </motion.button>
                    ) : (
                        <motion.div
                            key="quantity-controls"
                            initial={{ opacity: 0, rotateX: -90, y: 50 }}
                            animate={{ opacity: 1, rotateX: 0, y: 0 }}
                            exit={{ opacity: 0, rotateX: -90, y: 50 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="flex flex-col items-center justify-center text-white text-lg"
                        >
                            <div className="flex items-center justify-center gap-4 p-0 m-0">
                                <button
                                    onClick={decrement}
                                    className="bg-neutral-400 hover:bg-neutral-500 p-2 rounded-full transition"
                                >
                                    <FaMinus className="w-2 h-2" />
                                </button>
                                <motion.span
                                    key={quantity}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                >
                                    {quantity}
                                </motion.span>
                                <button
                                    onClick={increment}
                                    className="bg-neutral-400 hover:bg-neutral-500 p-2 rounded-full transition"
                                >
                                    <FaPlus className="w-2 h-2" />
                                </button>
                            </div>

                            <button
                                onClick={handleCancel}
                                className="text-white text-xs m-0 p-0"
                            >
                                cancel
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
