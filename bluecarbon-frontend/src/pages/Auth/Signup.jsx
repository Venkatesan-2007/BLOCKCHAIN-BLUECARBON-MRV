
import React, { useState } from "react";
import { signup } from "@/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [loginType, setLoginType] = useState("email"); // "email" or "phone"
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("NGO");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      if (!password || !role || (!email && !phone)) {
        setError("Please fill in all required fields");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const response = await signup({
        email: loginType === "email" ? email : null,
        username: loginType === "email" ? email : phone,
        phone: loginType === "phone" ? phone : null,
        password,
        role
      });
      if (response) {
        alert("Registration successful! Please login with your credentials.");
        navigate("/login");
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.detail || 
                      (typeof err?.response?.data === 'object' ? JSON.stringify(err.response.data) : err.response?.data) ||
                      err.message ||
                      "Signup failed. Please try again.";
      setError(errorMsg);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          type="button"
          onClick={() => setLoginType("email")}
          className={`px-4 py-2 rounded-full ${
            loginType === "email"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          } transition-colors`}
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
          } transition-colors`}
        >
          Phone
        </button>
      </div>
      <form onSubmit={submit} className="space-y-6">
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
                required
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
                required
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="NGO">NGO</option>
            <option value="Community">Community</option>
            <option value="Panchayat">Panchayat</option>
          </select>
        </div>
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Create Account
        </button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

