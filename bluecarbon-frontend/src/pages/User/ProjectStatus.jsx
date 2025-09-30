
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const STAGES = ["Draft", "Submitted", "Verified", "Approved"];

export default function ProjectStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchStatus();
    fetchProject();
    const int = setInterval(fetchStatus, 10000);
    return () => clearInterval(int);
  }, []);

  async function fetchStatus() {
    try {
      const res = await api.get(`/projects/${id}/status`);
      setStatus(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  async function fetchProject() {
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      // ignore
    }
  }

  if (!status) return <div>Loading status...</div>;

  // Status tracker
  const currentStageIdx = STAGES.indexOf(status.stage);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10 relative">
      <BackButton />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Status</h2>
      {/* Project summary */}
      {project && (
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <div className="font-semibold text-lg mb-1">{project.name}</div>
          <div className="text-gray-600 text-sm mb-1">Species: {project.species || '—'}</div>
          <div className="text-gray-600 text-sm mb-1">Hectares: {project.hectares || '—'}</div>
        </div>
      )}
      {/* Status tracker */}
      <div className="flex items-center justify-between mb-8">
        {STAGES.map((stage, idx) => (
          <div key={stage} className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
              idx < currentStageIdx
                ? "bg-green-600"
                : idx === currentStageIdx
                ? "bg-blue-600"
                : "bg-gray-300 text-gray-500"
            }`}>
              {idx + 1}
            </div>
            <div className={`mt-2 text-xs font-medium ${idx === currentStageIdx ? "text-blue-700" : "text-gray-500"}`}>{stage}</div>
            {idx < STAGES.length - 1 && (
              <div className="w-full h-1 bg-gray-300 mt-2 mb-2" />
            )}
          </div>
        ))}
      </div>
      {/* Blockchain proof */}
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <div className="text-gray-500 text-xs mb-1">Blockchain Proof</div>
        <div className="text-xs break-all mb-1">
          <strong>Report Hash:</strong> {status.report_hash || '—'}
        </div>
        <div className="text-xs break-all mb-1">
          <strong>IPFS CID:</strong> {status.ipfs_cid ? (
            <a href={`https://ipfs.io/ipfs/${status.ipfs_cid}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{status.ipfs_cid}</a>
          ) : '—'}
        </div>
        <div className="text-xs break-all">
          <strong>On-chain Tx:</strong> {status.onchain_hash ? (
            <a href={`https://explorer/tx/${status.onchain_hash}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{status.onchain_hash}</a>
          ) : 'Pending'}
        </div>
      </div>
      {/* Verifier and notes */}
      <div className="mb-4">
        <div className="text-gray-600 text-sm mb-1"><strong>Verifier:</strong> {status.verifier || '—'}</div>
        <div className="text-gray-600 text-sm"><strong>Notes:</strong> {status.notes || '—'}</div>
      </div>
      <button onClick={() => navigate('/dashboard')} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium mt-2">Back to Dashboard</button>
    </div>
  );
}
