import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";
import BackButton from "@/components/BackButton";

export default function CarbonReport(){
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchReport();
  },[]);

  async function fetchReport(){
    setLoading(true);
    try{
      // attempt to fetch latest ai result / report for project
      const res = await api.get(`/projects/${id}/report`);
      setReport(res.data);
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  }

  async function downloadPdf(){
    try{
      const res = await api.get(`/projects/${id}/report/pdf`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `project_${id}_report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }catch(err){
      console.error(err);
      alert("Failed to download report");
    }
  }

  async function submitToNCCR(){
    try{
      await api.post(`/projects/${id}/submit`);
      alert("Submitted to NCCR for verification");
    }catch(err){
      alert("Submit failed");
    }
  }

  if(loading) return <div>Loading report...</div>;

  if(!report) return (
    <div className="bg-white p-6 rounded shadow">No report available yet. Please wait while AI processes your data.</div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10 relative">
      <BackButton />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Carbon Report — Project {id}</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-gray-500 text-xs mb-1">Estimated Carbon Stock</div>
            <div className="text-xl font-bold text-green-700">{report.carbon_estimate} tCO₂e</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-gray-500 text-xs mb-1">Uncertainty Range</div>
            <div className="text-lg font-semibold">± {report.uncertainty}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-gray-500 text-xs mb-1">Validated Area</div>
            <div className="text-lg font-semibold">{report.validated_area || '—'} ha</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-gray-500 text-xs mb-1">Method</div>
            <div className="text-sm">{report.method || 'Automated vegetation segmentation & allometry'}</div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="text-gray-500 text-xs mb-1">IPFS CID</div>
          <div className="text-xs break-all">{report.ipfs_cid || '—'}</div>
        </div>
        <div className="flex flex-wrap gap-4 mt-6">
          <button onClick={downloadPdf} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">Download PDF Report</button>
          <button onClick={submitToNCCR} className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium">Submit to NCCR</button>
        </div>
      </div>
    </div>
  );
}
