import React, { useState } from "react";
import { createProject } from "../../api";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const speciesOptions = [
  "Mangrove",
  "Avicennia marina",
  "Rhizophora mucronata",
  "Sonneratia alba",
  "Other"
];

export default function CreateProject() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [hectares, setHectares] = useState("");
  const [species, setSpecies] = useState("");
  const [customSpecies, setCustomSpecies] = useState("");
  const [coordinates, setCoordinates] = useState(""); // Placeholder for GPS/polygon
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e, draft = false) {
    e.preventDefault();
    setError("");
    if (!name || !hectares || !(species || customSpecies)) {
      setError("Please fill in all required fields");
      return;
    }
    try {
      try {
        const projectData = {
          name,
          location,
          hectares: Number(hectares),
          species: species === "Other" ? customSpecies : species,
          coordinates,
          status: draft ? "Draft" : "Submitted"
        };
        console.log("Sending project data:", projectData);
        const project = await createProject(projectData);
        console.log("Server response:", project);
        
        if (draft) {
          alert("Draft saved!");
          navigate("/dashboard");
        } else {
          if (project && project.id) {
            navigate(`/projects/${project.id}/upload`);
          } else {
            throw new Error("No project ID received from server");
          }
        }
      } catch (error) {
        console.error("Project creation error:", error);
        setError(error?.response?.data?.detail || "Failed to create project: " + error.message);
      }
    } catch (err) {
      setError(err?.response?.data?.detail || "Create failed");
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10 relative">
      <BackButton />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Project</h2>
      <form onSubmit={e => submit(e, false)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Project name" className="w-full border p-3 rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location (village, district)</label>
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="w-full border p-3 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hectares Planted</label>
          <input value={hectares} onChange={e => setHectares(e.target.value)} placeholder="Hectares" type="number" min="0" className="w-full border p-3 rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Species Planted</label>
          <select value={species} onChange={e => setSpecies(e.target.value)} className="w-full border p-3 rounded-lg" required>
            <option value="">Select species</option>
            {speciesOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          {species === "Other" && (
            <input value={customSpecies} onChange={e => setCustomSpecies(e.target.value)} placeholder="Enter species" className="w-full border p-3 rounded-lg mt-2" required />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Area (GPS/Polygon)</label>
          <div className="w-full border border-dashed border-gray-400 rounded-lg p-4 text-gray-500 bg-gray-50 text-center mb-2">
            {/* Map widget placeholder */}
            <span>Map widget coming soon. Enter coordinates manually for now.</span>
            <input value={coordinates} onChange={e => setCoordinates(e.target.value)} placeholder="lat1,lng1; lat2,lng2; ..." className="w-full border p-2 rounded-lg mt-2" />
          </div>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex gap-4">
          <button type="button" onClick={e => submit(e, true)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium">Save Draft</button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">Next: Upload Data</button>
        </div>
      </form>
    </div>
  );
}
