import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  async function handleRegister() {
    if (!fullName || !email || !username || !password || !avatar) {
      return alert("All fields — including avatar — are required!");
    }

    try {
      const form = new FormData();
      form.append("fullName", fullName);
      form.append("email", email);
      form.append("username", username);
      form.append("password", password);
      form.append("avatar", avatar); // REQUIRED FIELD

      // Optional:
      // form.append("coverImage", coverImage);

      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration failed!");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <label className="text-gray-300 mb-2 block text-center font-medium">
            Upload Avatar (Required)
          </label>

          {/* Preview Box */}
          <div
            className="w-28 h-28 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition"
            onClick={() => document.getElementById("avatarInput").click()}
          >
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">Choose Image</span>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md text-lg font-semibold transition"
        >
          Register
        </button>

        {/* Login */}
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
