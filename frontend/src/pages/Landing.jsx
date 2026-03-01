import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-indigo-50">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
          Citizen Grievance Tracker
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          A transparent platform for citizens to submit complaints and for
          officials to resolve them efficiently.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Citizen Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            For Citizens
          </h2>
          <p className="text-gray-600 mb-6">
            Register or login to submit complaints, track their status, and
            engage in discussions with officials.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
            >
              Signup
            </Link>
          </div>
        </div>

        {/* Admin Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            For Admins
          </h2>
          <p className="text-gray-600 mb-6">
            Officials can log in to view all complaints, update their status,
            and respond to citizens.
          </p>
          <div className="flex justify-center">
            <Link
              to="/admin-login"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

