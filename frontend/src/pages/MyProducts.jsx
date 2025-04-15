import { useEffect, useState } from "react";
import MyProduct from "../Components/MyProduct";
import NavBar from "../Components/navbar";
import axios from "axios";

export default function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const email = ""

    useEffect(() => {
        console.log(localStorage.getItem("token"))
        if (localStorage.getItem("token")){axios.get(`https://ecommerce-follow-along-1-trh6.onrender.com/product/get-my-products`,{headers:{"Authorization":localStorage.getItem("token")}})
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                } 
                return res.data;
            })
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
                
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError(err.message);
                setLoading(false);
            });}
    }, [email]);

    if (loading) {
        return <div className="text-center text-black mt-10">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
    }


    if (!localStorage.getItem("token")) {
        return (
          <div className="text-center mt-10">
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.replace("/login")}
            >
              Login
            </button>
          </div>
        );
      }
      
      return (
        <>
          <NavBar />
          <div className="w-full min-h-screen bg-neutral-800">
            <h1 className="text-3xl text-center text-black py-6 font-bold">My products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
              {products && products.map((product) => (
                <MyProduct key={product._id} {...product} />
              ))}
              {!products && <div className="text-center text-white">No products found</div>}
            </div>
          </div>
        </>
      );
      
}