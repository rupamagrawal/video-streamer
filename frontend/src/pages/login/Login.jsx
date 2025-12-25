import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getValidationError } from "../../utils/validation";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleIdentifierChange = (e) => {
    const value = e.target.value;
    setIdentifier(value);
    if (value.trim()) {
      setIdentifierError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.trim()) {
      setPasswordError("");
    }
  };

  async function handleLogin() {
    // Validation
    let hasError = false;
    
    if (!identifier.trim()) {
      setIdentifierError("Username or email is required");
      hasError = true;
    } else {
      setIdentifierError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) {
      setLocalError("Please fix the errors above");
      return;
    }

    setIsLoading(true);
    setLocalError("");

    try {
      const credentials = {
        username: identifier,
        password: password,
      };

      await loginUser(credentials);
      navigate("/");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Login failed! Please try again.";
      setLocalError(errorMsg);
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white px-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {/* Error Message Display */}
        {localError && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm">
            {localError}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter username or email"
          value={identifier}
          onChange={handleIdentifierChange}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="w-full p-3 mb-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />
        {identifierError && <p className="text-red-400 text-sm mb-4">{identifierError}</p>}

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="w-full p-3 mb-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />
        {passwordError && <p className="text-red-400 text-sm mb-6">{passwordError}</p>}
        {!passwordError && <div className="mb-6"></div>}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 py-3 rounded-lg text-white font-semibold transition disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:text-blue-400">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
