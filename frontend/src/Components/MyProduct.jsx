import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyProduct({ _id, name, images, description, price, onDelete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images]);

    const currentImage = images && images.length > 0 ? images[currentIndex] : null;

    const handleEdit = () => {
        navigate(`/edit-product/${_id}`);
    };

    const handleDelete = async () => {
        // Confirm before deleting
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }
        
        try {
            setIsDeleting(true);
            
            const response = await axios.delete(
                `https://ecommerce-follow-along-1-trh6.onrender.com/product/delete-product/${_id}`
            );
            
            if (response.status === 200) {
                alert("Product deleted successfully!");
                
                // If parent provided onDelete callback, use it
                if (typeof onDelete === 'function') {
                    onDelete(_id);
                } else {
                    // Otherwise refresh the page
                    window.location.reload();
                }
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            
            // Check if we have a response with a message
            if (err.response && err.response.data && err.response.data.message) {
                alert(`Failed to delete product: ${err.response.data.message}`);
            } else {
                alert("Failed to delete product. Please try again later.");
            }
        } finally {
            setIsDeleting(false);
        }
    };

    // Safely format price
    const formattedPrice = typeof price === 'number' ? price.toFixed(2) : price;

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                <div className="w-full">
                    {currentImage ? (
                        <img
                            src={`https://ecommerce-follow-along-1-trh6.onrender.com${currentImage}`}
                            alt={name}
                            className="w-full h-56 object-cover rounded-lg mb-2"
                        />
                    ) : (
                        <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-lg mb-2">
                            <span className="text-gray-500">No image available</span>
                        </div>
                    )}
                    <h2 className="text-lg font-bold">{name}</h2>
                    <p className="text-sm opacity-75 mt-2">{description}</p>
                </div>
                <div className="w-full mt-4">
                    <p className="text-lg font-bold my-2">${formattedPrice}</p>
                    <button
                        className="w-full text-white px-4 py-2 rounded-md bg-neutral-900 hover:bg-neutral-700 transition duration-300"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-full text-white px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition duration-300 mt-2 disabled:bg-blue-300"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
            <br />
        </>
    );
}

export default MyProduct;