import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login: loginUser } = useAuth(); // rename to avoid name conflict

  async function handleLogin() {
    try {
      const credentials = {
        username: identifier, // backend accepts username OR email
        password: password,
      };

      await loginUser(credentials); // call AuthContext login function

      navigate("/"); // redirect after success
    } catch (error) {
      console.log(error);
      alert("Login failed!");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Enter username or email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
