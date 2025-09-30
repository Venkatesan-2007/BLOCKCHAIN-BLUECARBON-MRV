import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";

export default function Verification(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [decision, setDecision] = useState("approve");
  const [loading, setLoading] = useState(false);

  async function submitDecision(){
    setLoading(true);
    try{
      if(decision === "approve"){
        await api.post(`/admin/verify`, { project_id: id, action: "approve", notes });
        alert("Project approved and will mint tokens on chain");
      } else {
        await api.post(`/admin/verify`, { project_id: id, action: "reject", notes });
        alert("Project rejected");
      }
      navigate("/admin/dashboard");
    }catch(err){
      console.error(err);
      alert("Action failed");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Verify Project {id}</h2>
      <div className="mb-3">
        <label className="block mb-1">Decision</label>
        <select value={decision} onChange={e=>setDecision(e.target.value)} className="border p-2 rounded w-full">
          <option value="approve">Approve</option>
          <option value="reject">Reject</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1">Notes</label>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} className="w-full border p-2 rounded" rows={4} />
      </div>
      <button onClick={submitDecision} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? "Working..." : "Submit"}</button>
    </div>
  );
}
