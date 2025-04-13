import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

export default function CartProduct({ productId, productImages, productName, quantity, price }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityVal, setQuantityVal] = useState(quantity);

    const handleIncrement = () => {
        const newQuantityVal = quantityVal + 1;
        setQuantityVal(newQuantityVal);
        updateQuantityVal(newQuantityVal);
    };

    const handleDecrement = () => {
        const newQuantityVal = quantityVal > 1 ? quantityVal - 1 : 1;
        setQuantityVal(newQuantityVal);
        updateQuantityVal(newQuantityVal);
    };

    useEffect(() => {
        if (productImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                return (prev + 1) % productImages.length;
            });
        }, 3000); // Adjusted timing for a smoother transition

        return () => clearInterval(interval);
    }, [currentIndex, productImages.length]);

    const updateQuantityVal = (quantity) => {
        axios.patch('http://localhost:3000/product/cart', {
            id: productId,
            quantity: quantity,
        }, { headers: { "Authorization": localStorage.getItem("token") } })
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.data;
            })
            .then((data) => {
                console.log('quantityVal updated:', data);
            })
            .catch((err) => {
                console.error('Error updating quantityVal:', err);
            });
    };

    return (
        <>
        <div className="w-full p-4 flex justify-between border-b border-neutral-300 bg-blue-100 rounded-lg text-black">
            <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-x-4">
                {/* Image carousel */}
                <div className="w-24 h-24 md:w-64 md:h-40 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                        src={`http://localhost:3000/${productImages[currentIndex].replace(/\\/g, "/")}`}
                        alt={productName}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
                    <div className="flex flex-col justify-start md:ml-4">
                        <p className="text-xl font-semibold text-gray-800">{productName}</p>
                        <p className="text-lg text-gray-600">${price * quantityVal}</p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-x-2 mt-2 md:mt-0">
                        <div
                            onClick={handleDecrement}
                            className="flex justify-center items-center bg-blue-200 hover:bg-blue-100 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                        >
                            <MdOutlineRemoveCircleOutline size={24} />
                        </div>
                        <div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
                            {quantityVal}
                        </div>
                        <div
                            onClick={handleIncrement}
                            className="flex justify-center items-center bg-blue-200 hover:bg-blu1-100 active:translate-y-1 p-2 rounded-xl cursor-pointer"
                        >
                            <IoIosAddCircleOutline size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br></br>
    </>
    );
}
