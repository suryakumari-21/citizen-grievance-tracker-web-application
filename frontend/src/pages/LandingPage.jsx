import { Link } from "react-router-dom";
import { User, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white/10 backdrop-blur-lg shadow-lg">
        <h1 className="text-2xl font-bold">Citizen Grievance Tracker</h1>
        <div className="space-x-6">
          <Link to="/login" className="hover:text-yellow-300">Citizen Login</Link>
          <Link to="/register" className="hover:text-yellow-300">Citizen Signup</Link>
          <Link to="/admin-login" className="hover:text-green-300">Admin Login</Link>
          <Link to="/admin-register" className="hover:text-green-300">Admin Signup</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h1 className="text-6xl font-extrabold drop-shadow-xl">
          Raise Issues. Get Them Resolved.
        </h1>
        <p className="mt-6 text-lg max-w-2xl text-indigo-100">
          A transparent platform where citizens can submit complaints and officials
          can manage and resolve them efficiently.
        </p>
        <div className="flex gap-6 mt-10">
          <Link
            to="/login"
            className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-500"
          >
            Citizen Portal
          </Link>
          <Link
            to="/admin-login"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

