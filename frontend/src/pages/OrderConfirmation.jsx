import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedAddress = location.state?.selectedAddress;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get("https://ecommerce-follow-along-1-trh6.onrender.com/product/getcart", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setCart(res.data.cart);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
      });
  }, []);

  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  const onSuccess = () => {
    alert("Payment successful! Redirecting to orders page...");
    navigate("/my-orders");
  };

  if (!selectedAddress) {
    return (
      <div className="text-center mt-10 text-red-500 text-lg">
        No address selected. Please go back and select an address.
      </div>
    );
  }

  return (
    <>
      {cart.length > 0 ? (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Selected Address</h2>
          <div className="mb-6 text-gray-800 space-y-1">
            <p>{selectedAddress.address1}, {selectedAddress.address2}</p>
            <p>{selectedAddress.city}, {selectedAddress.country} - {selectedAddress.zipCode}</p>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
          {cart.map((product) => (
            <div
              key={product.productId}
              className="border border-gray-300 p-4 mb-3 rounded"
            >
              <h3 className="text-lg font-medium">{product.productName}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))}

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h2>
          </div>

          <div className="mt-8">
            <PayPalScriptProvider options={{ clientId: "AW78-TcxiCBodENWIJtudObD6al4SGS-CKaVm-qFghtbiLZz9jMfzA7W5Nf3loR8tflCjBPnpRicDyQk" }}>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{ amount: { value: total.toFixed(2) } }],
                  });
                }}
                onApprove={async (data, actions) => {
                  try {
                    const order = await actions.order.capture();
                    const response = await axios.post(
                      "https://ecommerce-follow-along-1-trh6.onrender.com/order/verify-payment",
                      { orderId: order.id },
                      {
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      }
                    );

                    if (response.data.success) {
                      onSuccess();
                    } else {
                      alert("Payment verification failed.");
                    }
                  } catch (err) {
                    console.error("Payment error:", err);
                    alert("Error processing payment. Please try again.");
                  }
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg text-gray-500 mt-10">Cart is empty</div>
      )}
    </>
  );
};

export default OrderConfirmation;
