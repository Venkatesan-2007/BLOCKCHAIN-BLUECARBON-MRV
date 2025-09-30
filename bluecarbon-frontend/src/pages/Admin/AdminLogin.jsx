import React, { useState } from "react";
import api from "../../api";
import { setToken, setRole } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      // Send { username, password } as backend expects
      const res = await api.post("/auth/login", { username: email, password });
      const { access_token, role } = res.data;
      if (role !== "admin") {
        setErr("Not an admin account");
        return;
      }
      setToken(access_token);
      setRole("admin");
      nav("/admin/dashboard");
    }catch(err){
      setErr(err?.response?.data?.detail || "Login failed");
    }
  }

  return (
    <div className="max-w-md bg-white p-6 rounded shadow mx-auto">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border p-2 rounded" />
        {err && <div className="text-red-600">{err}</div>}
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
