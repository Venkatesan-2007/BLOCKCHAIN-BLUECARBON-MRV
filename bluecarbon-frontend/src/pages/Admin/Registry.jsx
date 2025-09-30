import React, { useEffect, useState } from "react";
import api from "../../api";

export default function Registry(){
  const [items, setItems] = useState([]);

  useEffect(()=> {
    api.get("/admin/registry").then(r => setItems(r.data)).catch(console.error);
  },[]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Registry / Token Ledger</h1>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Project</th>
              <th className="py-2">Carbon (tCO2e)</th>
              <th className="py-2">Tokens minted</th>
              <th className="py-2">On-chain tx</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.project_id} className="border-t">
                <td className="py-2">{it.project_name}</td>
                <td className="py-2">{it.carbon_value}</td>
                <td className="py-2">{it.tokens}</td>
                <td className="py-2">{it.tx_hash ? <a className="text-blue-600" href={`https://explorer/tx/${it.tx_hash}`}>View</a> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
