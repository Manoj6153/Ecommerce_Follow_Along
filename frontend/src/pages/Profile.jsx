import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ecommerce-follow-along-1-trh6.onrender.com/auth/get-user", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
      });
  }, []);

  const handleAddress = () => {
    navigate("/add-address");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-700">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className=" text-gray-800 rounded-xl">
      <NavBar />
      <div className="max-w-5xl mx-aut px-4 bg-white rounded-xl p-6">
        {/* Profile Header */}
        <div className="bg-blue-100 rounded-xl shadow-md p-6 flex items-center space-x-6">
          <img
            className="w-24 h-24 rounded-full object-cover border"
            src={`https://ecommerce-follow-along-1-trh6.onrender.com${user.avatar?.url.replace(/\\/g, "/")}`}
            alt="User Avatar"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Your Addresses</h3>
            <button
              onClick={handleAddress}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add Address
            </button>
          </div>

          {user.addresses && user.addresses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.addresses.map((address, index) => (
                <div
                  key={index}
                  className="bg-blue-100 shadow rounded-lg p-4 border-l-4 border-blue-500"
                >
                  <h4 className="font-semibold text-lg mb-1">
                    {address.addressType}
                  </h4>
                  <p className="text-sm">{address.address1}</p>
                  <p className="text-sm">{address.address2}</p>
                  <p className="text-sm">
                    {address.city}, {address.country}
                  </p>
                  <p className="text-sm">Zip: {address.zipCode}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p>No address found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
