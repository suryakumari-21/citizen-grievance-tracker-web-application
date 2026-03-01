// src/pages/ChooseAccount.jsx
import { Link } from "react-router-dom";

export default function ChooseAccount() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">
          Choose Your Account Type
        </h2>

        {/* Citizen Section */}
        <div className="mb-8 p-6 border rounded-xl bg-blue-50">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">Citizen</h3>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Admin Section */}
        <div className="p-6 border rounded-xl bg-pink-50">
          <h3 className="text-xl font-semibold text-pink-700 mb-3">Admin / Official</h3>
          <div className="flex justify-center gap-4">
            <Link
              to="/admin-login"
              className="px-5 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              Login
            </Link>
            <Link
              to="/admin-register"
              className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
