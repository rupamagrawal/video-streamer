import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, axiosInstance } from "../../context/AuthContext";
import { getValidationError } from "../../utils/validation";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleFieldChange = (field, value) => {
    if (field === "fullName") setFullName(value);
    if (field === "email") setEmail(value);
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);
    
    if (value && errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (/\d/.test(fullName)) {
      newErrors.fullName = "Full name cannot contain numbers";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      newErrors.username = "Username: 3-20 chars, alphanumeric and underscore only";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!avatar) {
      newErrors.avatar = "Avatar image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleRegister() {
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);
    try {
      const form = new FormData();
      form.append("fullName", fullName);
      form.append("email", email);
      form.append("username", username);
      form.append("password", password);
      form.append("avatar", avatar);

      const res = await axiosInstance.post(
        "/users/register",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("User registered successfully!");
      await loginUser({ username, password });
      navigate("/");
    } catch (error) {
      console.log(error);
      const errorMsg = error.response?.data?.message || "Registration failed!";
      setErrors({ general: errorMsg });
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {/* General Error */}
        {errors.general && (
          <p className="text-red-400 text-sm mb-3 text-center">{errors.general}</p>
        )}

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => handleFieldChange("fullName", e.target.value)}
          className="w-full mb-1 px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.fullName && (
          <p className="text-red-400 text-sm mb-3">{errors.fullName}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          className="w-full mb-1 px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mb-3">{errors.email}</p>
        )}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => handleFieldChange("username", e.target.value)}
          className="w-full mb-1 px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.username && (
          <p className="text-red-400 text-sm mb-3">{errors.username}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handleFieldChange("password", e.target.value)}
          className="w-full mb-1 px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.password && (
          <p className="text-red-400 text-sm mb-3">{errors.password}</p>
        )}

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-4">
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
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              if (e.target.files[0]) {
                setErrors({ ...errors, avatar: "" });
              }
            }}
          />
        </div>
        {errors.avatar && (
          <p className="text-red-400 text-sm mb-3 text-center">{errors.avatar}</p>
        )}

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-md text-lg font-semibold transition"
        >
          {isLoading ? "Registering..." : "Register"}
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
