// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { login } from "../../api";
import { setToken, setRole } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginType, setLoginType] = useState("email"); // "email" or "phone"
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const username = loginType === "email" ? email : phone;
      console.log("Attempting login with:", { username, password });
      
      const response = await login({ 
        username, 
        password 
      });
      
      console.log("Login response:", response);

      if (!response || !response.access_token) {
        throw new Error('Invalid response from server: No access token received');
      }

      // Token and role are already saved by loginUser function
      
      // Debug log
      console.log("Token saved:", localStorage.getItem("token"));
      console.log("Role saved:", localStorage.getItem("role"));

      // ✅ Redirect user based on role
      console.log("Redirecting with role:", response.role);
      
      if (response.role?.toLowerCase() === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      let errorMsg = "Login failed. Please check credentials.";
      if (err?.response?.data?.detail) errorMsg = err.response.data.detail;
      else if (typeof err?.response?.data === "object") errorMsg = JSON.stringify(err.response.data);
      else if (err?.response?.data) errorMsg = err.response.data;
      else if (err?.message) errorMsg = err.message;
      setError(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          type="button"
          onClick={() => setLoginType("email")}
          className={`px-4 py-2 rounded-full ${
            loginType === "email"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => setLoginType("phone")}
          className={`px-4 py-2 rounded-full ${
            loginType === "phone"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Phone
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          {loginType === "email" ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={loginType === "email"}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={loginType === "phone"}
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Login
        </button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

