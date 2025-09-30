import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function AdminDashboard(){
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

  useEffect(()=> fetchProjects(), [filter]);

  async function fetchProjects(){
    setLoading(true);
    try{
      const res = await api.get(`/admin/projects?status=${filter}`);
      setProjects(res.data);
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Admin — Projects</h1>
        <div>
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="border p-1 rounded">
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="approved">Approved</option>
          </select>
          <Link to="/admin/registry" className="ml-3 text-blue-600">Registry</Link>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="space-y-3">
          {projects.length === 0 && <div>No projects</div>}
          {projects.map(p => (
            <div key={p.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-600">by {p.owner_email} — {p.hectares} ha</div>
              </div>
              <div className="flex gap-2">
                <Link to={`/admin/project/${p.id}`} className="px-3 py-1 border rounded">View</Link>
                <Link to={`/admin/verify/${p.id}`} className="px-3 py-1 bg-green-600 text-white rounded">Verify</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
