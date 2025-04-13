import { useState } from "react";
import NavBar from "../Components/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddressForm = () => {
  const [address, setAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    country: "",
    zipCode: "",
    addressType: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/auth/add-address",
        address,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token || "",
          },
        }
      );
      if (response.status === 201) {
        alert("Address added successfully!");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error adding address:", err);
      alert("Failed to add address. Please check the data and try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen  text-black w-96">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-xl font-semibold mb-4 text-center">Add Your Address</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: "address1", label: "Address Line 1", placeholder: "Enter address line 1" },
              { id: "address2", label: "Address Line 2", placeholder: "Enter address line 2" },
              { id: "city", label: "City", placeholder: "Enter city" },
              { id: "country", label: "Country", placeholder: "Enter country" },
              { id: "zipCode", label: "Zip Code", placeholder: "Enter zip code" },
            ].map(({ id, label, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  id={id}
                  type="text"
                  placeholder={placeholder}
                  value={address[id]}
                  onChange={(e) => setAddress({ ...address, [id]: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  required={id !== "address2"} // address2 is optional
                />
              </div>
            ))}

            <div>
              <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">
                Address Type
              </label>
              <select
                id="addressType"
                value={address.addressType}
                onChange={(e) => setAddress({ ...address, addressType: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
                required
              >
                <option value="">Select address type</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition mt-2"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
