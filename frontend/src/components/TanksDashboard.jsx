import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

// Use Vite env var (create .env with VITE_API_BASE if needed)
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
const api = axios.create({ baseURL: API_BASE, timeout: 10000 });

function TanksDashboard() {
  const [tanks, setTanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTanks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/tanks');
      setTanks(res.data || []);
    } catch (err) {
      setError(err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTanks();

    // Optional polling for near-real-time updates (uncomment to enable)
    // const id = setInterval(fetchTanks, 10000); // poll every 10s
    // return () => clearInterval(id);
  }, [fetchTanks]);

  return (
    <div className="p-4 bg-[#0f1724] text-white rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">All Tanks</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchTanks}
            className="px-3 py-1 bg-[#183d50] rounded text-sm"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-3 text-red-300">Failed to load tanks: {error}</div>
      )}

      {loading && !tanks.length ? (
        <div className="text-gray-300">Loading tanks…</div>
      ) : (
  <div className="overflow-auto max-h-72">
          <table className="min-w-full text-sm table-auto">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Capacity</th>
                <th className="px-2 py-1">Current Level</th>
                <th className="px-2 py-1">Station</th>
                <th className="px-2 py-1">ID</th>
              </tr>
            </thead>
            <tbody>
              {tanks.map((tank) => (
                <tr key={tank._id} className="border-t border-slate-700">
                  <td className="px-2 py-2">{tank.name}</td>
                  <td className="px-2 py-2">{tank.capacity ?? '—'}</td>
                  <td className="px-2 py-2">{tank.currentLevel ?? '—'}</td>
                  <td className="px-2 py-2">{tank.station ?? '—'}</td>
                  <td className="px-2 py-2 break-all">{tank._id}</td>
                </tr>
              ))}
              {tanks.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-2 py-4 text-gray-400">
                    No tanks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TanksDashboard;
