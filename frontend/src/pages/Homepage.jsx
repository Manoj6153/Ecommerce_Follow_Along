import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard';
import axios from 'axios';
import NavBar from "../Components/navbar";

export default function Homepage() {
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("https://ecommerce-follow-along-1-trh6.onrender.com/product/get-products");
                if (res.status !== 200) throw new Error(`HTTP Error! status: ${res.status}`);
                setProductDetails(res.data.products);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <NavBar />
            <div className="w-full min-h-64 px-6 py-8">
                {loading ? (
                    <div className="text-center text-lg text-gray-600">Loading products...</div>
                ) : error ? (
                    <div className="text-center text-red-500 font-medium">{error}</div>
                ) : (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
                        {productDetails.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
