import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/navbar';
import CartProduct from '../Components/cartProduct';
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://ecommerce-follow-along-1-trh6.onrender.com/product/getcart`, { headers: { "Authorization": localStorage.getItem("token") } })
            .then((res) => {
                if (res.status !== 200) {
                    console.log("Error in cart page");
                }
                console.log(res.data);
                return res.data;
            })
            .then((data) => {
                setProducts(data.cart);
                console.log("Products fetched:", data.cart);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });
    }, []);

    console.log("Products:", products);

    return (
        <>
            <NavBar />
            <div className='w-full h-16 flex items-center justify-center'>
                <h1 className='text-3xl font-semibold text-gray-800'>Your Cart</h1>
            </div>
            <div className='w-full h-screen bg-gray-50'>
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='w-full md:w-4/5 lg:w-3/5 2xl:w-2/3 h-full bg-white shadow-lg rounded-xl border border-gray-300 p-5'>
                        <div className='w-full flex-grow overflow-auto px-3 py-2 gap-y-4'>
                            {
                                products.length > 0 ? (
                                    products.map(product => (
                                        <CartProduct key={product._id} {...product} />
                                    ))
                                ) : (
                                    <div className='text-center text-gray-500'>Your cart is empty</div>
                                )
                            }
                        </div>
                        <div className='w-full flex justify-between items-center mt-4 mb-4'>
                            <div className='font-semibold text-lg'>
                                <span className='text-gray-600'>Total Items: </span>
                                <span className='text-blue-600'>{products.length}</span>
                            </div>
                            <button
                                className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300'
                                onClick={() => navigate('/select-address', { state: { email: "manoj6153@gmail.com" } })}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
