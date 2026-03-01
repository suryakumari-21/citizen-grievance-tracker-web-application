import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints");
        setComplaints(res.data);
      } catch (err) {
        setError("Failed to load complaints");
      }
    };
    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "In Progress": return "bg-orange-100 text-orange-800 border border-orange-300";
      case "Resolved": return "bg-green-100 text-green-800 border border-green-300";
      default: return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-indigo-700">My Complaints</h2>
          <Link to="/new" className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">+ Submit New Complaint</Link>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {complaints.length === 0 ? (
          <p className="text-gray-600">No complaints yet. Submit one!</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {complaints.map((c) => (
              <Link to={`/complaint/${c._id}`} key={c._id} className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{c.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(c.status)}`}>{c.status}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Category: {c.category}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{c.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
