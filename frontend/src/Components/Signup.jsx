import { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/create-user",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(res);
      alert("User created successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 w-96">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create your account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-1 right-1 flex items-center text-gray-500 hover:text-black bg-black h-9"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.466C4.955 7.364 7.276 5.25 12 5.25s7.045 2.114 8.02 3.216a3.984 3.984 0 010 4.568C19.045 14.898 16.723 17.012 12 17.012s-7.045-2.114-8.02-3.216a3.984 3.984 0 010-4.568z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75A3 3 0 0115 12m3.75 3.75c-.708.637-2.835 2.25-6.75 2.25s-6.042-1.613-6.75-2.25a7.5 7.5 0 010-10.5c.708-.637 2.835-2.25 6.75-2.25s6.042 1.613 6.75 2.25"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password (not hooked yet) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Avatar
            </label>
            <div className="flex items-center space-x-4">
              <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="Avatar Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <MdAccountCircle className="h-10 w-10 text-gray-400" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="cursor-pointer px-3 py-1 bg-blue-500 text-white text-sm rounded-md shadow hover:bg-blue-600"
              >
                Upload
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                id="file-input"
                className="sr-only"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-200"
            >
              Sign Up
            </button>
          </div>

          {/* Redirect */}
          <div className="text-sm text-center mt-2">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
