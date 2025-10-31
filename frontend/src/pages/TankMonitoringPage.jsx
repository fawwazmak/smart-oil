import React, { useEffect, useState, useCallback } from 'react';
import TanksDashboard from '../components/TanksDashboard';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
const api = axios.create({ baseURL: API_BASE, timeout: 10000 });

const TankMonitoringPage = () => {
  // Inline events state and fetch logic (moved from EventsDashboard)
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/inventory/events');
      setEvents(res.data || []);
    } catch (err) {
      setError(err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
    // Optional polling:
    // const id = setInterval(fetchEvents, 8000);
    // return () => clearInterval(id);
  }, [fetchEvents]);

  return (
    <div className="min-h-screen bg-[#101624] text-white p-6">
      <h1 className="md:text-4xl text-3xl font-bold mb-6 text-white">Tank Monitoring</h1>

      {/* Two-column layout: left = live tanks, right = recent events (inlined) */}
      <div className="flex flex-col gap-6">
        <div>
          <TanksDashboard />
        </div>

        <div>
          {/* Inlined events JSX as requested */}
          <div className="p-4 bg-[#0f1724] text-white rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">All Inventory Events</h2>
              <div>
                <button
                  onClick={fetchEvents}
                  className="px-3 py-1 bg-[#183d50] rounded text-sm"
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>

            {error && <div className="mb-3 text-red-300">Failed to load events: {error}</div>}

            {loading && !events.length ? (
              <div className="text-gray-300">Loading events…</div>
            ) : (
              <div className="overflow-auto max-h-64">
                <table className="min-w-full text-sm table-auto">
                  <thead>
                    <tr className="text-left text-gray-400">
                      <th className="px-2 py-1">Tank</th>
                      <th className="px-2 py-1">Station</th>
                      <th className="px-2 py-1">Level</th>
                      <th className="px-2 py-1">Timestamp</th>
                      <th className="px-2 py-1">ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr key={ev._id} className="border-t border-slate-700">
                        <td className="px-2 py-2">{ev.tank ?? ev.tankId ?? '—'}</td>
                        <td className="px-2 py-2">{ev.station ?? '—'}</td>
                        <td className="px-2 py-2">{ev.level ?? '—'}</td>
                        <td className="px-2 py-2">{ev.timestamp ? new Date(ev.timestamp).toLocaleString() : ''}</td>
                        <td className="px-2 py-2 break-all">{ev._id}</td>
                      </tr>
                    ))}
                    {events.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-2 py-4 text-gray-400">No events found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TankMonitoringPage;