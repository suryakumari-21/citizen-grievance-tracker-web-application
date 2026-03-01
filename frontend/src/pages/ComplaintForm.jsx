import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Road");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/complaints", { title, category, description, photo });
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Submit a Complaint</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Complaint Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-3 border rounded-xl focus:ring focus:ring-indigo-300" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border rounded-xl focus:ring focus:ring-indigo-300">
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Other">Other</option>
          </select>
          <textarea placeholder="Describe your issue..." value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-3 border rounded-xl focus:ring focus:ring-indigo-300 min-h-[120px]" />
          <input type="text" placeholder="Photo URL (optional)" value={photo} onChange={(e) => setPhoto(e.target.value)} className="w-full p-3 border rounded-xl focus:ring focus:ring-indigo-300" />
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
}
