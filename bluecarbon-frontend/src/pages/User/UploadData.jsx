
import React, { useState } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

export default function UploadData() {
  const { id } = useParams(); // project id
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [csv, setCsv] = useState(null);
  const [notes, setNotes] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  function handleFiles(e) {
    setImages(Array.from(e.target.files));
  }
  function handleCSV(e) {
    setCsv(e.target.files[0]);
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData();
    form.append("project_id", id);
    form.append("notes", notes);
    images.forEach((f) => form.append("images", f));
    if (csv) form.append("csv", csv);

    try {
      await api.post("/projects/upload-data", form, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ev) => {
          if (ev.total) setProgress(Math.round((ev.loaded / ev.total) * 100));
        },
      });
      navigate(`/projects/${id}/report`);
    } catch (err) {
      setError(err?.response?.data?.detail || "Upload failed");
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Data (Project {id})</h2>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Drone/Field Images (GeoTIFF, JPEG, PNG)</label>
          <input type="file" multiple accept="image/*,.tif,.tiff" onChange={handleFiles} className="mt-2" />
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {images.map((img, i) => (
                <div key={i} className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center overflow-hidden border">
                  {img.type.startsWith("image/") ? (
                    <img src={URL.createObjectURL(img)} alt="preview" className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-xs text-gray-500">{img.name}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">CSV / Measurement Data (optional)</label>
          <input type="file" accept=".csv" onChange={handleCSV} className="mt-2" />
          {csv && (
            <div className="mt-2 text-xs text-gray-700">Selected: {csv.name}</div>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Notes for AI / Verifier</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes for AI / verifier" className="w-full border p-3 rounded-lg" rows={4} />
        </div>
        {progress > 0 && <div className="text-sm">Upload progress: {progress}%</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">Submit for AI Processing</button>
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border rounded-lg font-medium">Cancel</button>
        </div>
      </form>
    </div>
  );
}
