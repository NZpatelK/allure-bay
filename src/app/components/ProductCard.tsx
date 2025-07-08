// app/products/ProductCard.tsx
'use client';

import Image from 'next/image';
import { Rating } from '@mui/material';

export type Product = {
    id: number;
    title: string;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
};

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="border rounded-2xl shadow p-4 hover:shadow-md transition bg-white h-90 flex flex-col justify-between"
            style={{ width: '200px', flexShrink: 0 }}>
            <Image
                src={product.thumbnail}
                alt={product.title}
                width={100}
                height={100}
                className="rounded-xl object-cover w-full"
            />
            <div className="mt-4">
                <h2 className="text-xl font-regular text-gray-800">{product.title}</h2>
                <p className="text-lg font-bold mt-2 text-gray-800">${product.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-1">
                    <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
                    <span className="text-sm text-gray-600">({product.rating.toFixed(1)})</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{product.stock} in stock</p>
            </div>
        </div>
    );
}
