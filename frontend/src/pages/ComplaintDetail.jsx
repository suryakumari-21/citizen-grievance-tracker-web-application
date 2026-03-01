import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await API.get(`/complaints/${id}`);
        setComplaint(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || err.response?.data?.message || "Could not load complaint");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  const postComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await API.post(`/complaints/${id}/comments`, { body: commentText });
      setComplaint(res.data.complaint);
      setCommentText("");
    } catch (err) {
      setError("Failed to post comment");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return (
    <div className="p-6">
      <div className="text-red-600 mb-4">{error}</div>
      <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">Go Back</button>
    </div>
  );
  if (!complaint) return <div className="p-6">Complaint not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold">{complaint.title}</h1>
        <div className="text-sm text-gray-500 mt-1">{complaint.category} • {new Date(complaint.createdAt).toLocaleString()}</div>
        <div className="mt-4">
          <span className={`px-3 py-1 rounded-full text-sm ${complaint.status === "Pending" ? "bg-yellow-100 text-yellow-700" : complaint.status === "In Progress" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
            {complaint.status}
          </span>
        </div>
        <p className="mt-4 text-gray-700">{complaint.description}</p>
        <div className="mt-6">
          <h2 className="font-semibold">Discussion</h2>
          {complaint.comments?.length ? (
            <ul className="mt-3 space-y-3">
              {complaint.comments.map((c, i) => (
                <li key={i} className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-700">{c.body}</div>
                  <div className="text-xs text-gray-500 mt-1">— {c.user?.name || "User"} • {new Date(c.date).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No comments yet.</p>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <input className="flex-1 border rounded px-3 py-2" placeholder="Write a reply..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
          <button onClick={postComment} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Reply</button>
        </div>
      </div>
    </div>
  );
}
