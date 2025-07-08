'use client'
import { useEffect, useState } from "react";
import Sidenav from "../../components/sidenav"
import { useParams } from 'next/navigation';



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
    return (
        <div>
            <Sidenav screenWidth={(e) => setScreenWidth(e)} toggleSidebar={(e) => setSidebarOpen(e)} />
                {/* <h1>{searchParams.categories}</h1> */}
            {product.map((item: any) => (
                <div key={item.id}>
                    <h1>{item.title}</h1>
                </div>
            ))}
        </div>
    );
}