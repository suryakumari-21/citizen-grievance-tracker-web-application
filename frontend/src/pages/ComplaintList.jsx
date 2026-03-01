import { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/complaints')
      .then(res => setComplaints(res.data))
      .catch(err => setError(err.response?.data?.msg || 'Failed to load complaints'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8">
      <h3 className="text-xl font-bold mb-4">My Complaints</h3>
      {complaints.length === 0 ? (
        <p className="text-gray-500">No complaints found.</p>
      ) : (
        <ul className="space-y-2">
          {complaints.map(c => (
            <li key={c._id} className="border p-3 rounded-lg hover:bg-gray-50">
              <Link to={`/complaint/${c._id}`} className="text-cyan-600 font-medium hover:underline">
                {c.title}
              </Link>
              <span className="ml-3 text-sm text-gray-500">— {c.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
