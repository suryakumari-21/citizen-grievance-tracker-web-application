// frontend/src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api"; // ✅ use your configured axios instance

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ no hardcoding, use API from api.js
      const res = await API.post("/auth/login", { email, password });

      login(res.data.user, res.data.token);

      // redirect based on role
      if (res.data.user.role === "citizen") {
        navigate("/dashboard");
      } else if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-cyan-500 to-sky-500">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-cyan-600">Citizen Login</h2>
        <p className="mt-2 text-gray-500 text-center">Welcome back! Please login.</p>

        {error && <div className="bg-red-100 text-red-600 p-2 rounded mt-3">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}










