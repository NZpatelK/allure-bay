'use client';

import Image from 'next/image';
import { Rating } from '@mui/material';
import type { Product } from './ProductCard';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="rounded-2xl shadow p-4 hover:shadow-md transition bg-white h-full flex flex-col justify-between w-full box-border">
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
                <p className="text-base font-bold mt-1 text-gray-800">${product.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-1">
                    <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
                    <span className="text-sm text-gray-600">({product.rating.toFixed(1)})</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{product.stock} in stock</p>
            </div>
        </div>
    );
}
