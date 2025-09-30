import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams, Link } from "react-router-dom";

export default function ProjectDetail(){
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(()=> {
    api.get(`/admin/project/${id}`).then(r=>setProject(r.data)).catch(console.error);
  },[]);

  if(!project) return <div>Loading project...</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">{project.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div><strong>Owner:</strong> {project.owner_email}</div>
          <div><strong>Location:</strong> {project.location}</div>
          <div><strong>Hectares:</strong> {project.hectares}</div>
          <div><strong>Species:</strong> {project.species}</div>
        </div>
        <div>
          <div className="mb-2"><strong>AI Report:</strong></div>
          {project.report ? (
            <>
              <div>Carbon: {project.report.carbon_estimate}</div>
              <div>Uncertainty: {project.report.uncertainty}</div>
              <div className="mt-2">
                <a className="text-blue-600" href={`/admin/report/${project.id}`}>Download PDF</a>
              </div>
            </>
          ) : <div>No report</div>}
        </div>
      </div>

      <div className="mt-4">
        <Link to={`/admin/verify/${id}`} className="bg-green-600 text-white px-3 py-1 rounded">Verify / Reject</Link>
      </div>
    </div>
  );
}
