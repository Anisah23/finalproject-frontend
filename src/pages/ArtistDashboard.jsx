import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ArtistDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://finalproject-backend-1-ttj5.onrender.com/api/artist/dashboard');
      setDashboardData(response.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  const { stats, recent_orders } = dashboardData;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#E5961E] mb-8">Artist Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#260401] border border-[#E5961E] rounded-lg p-6 text-center">
            <h3 className="text-[#E5961E] text-sm uppercase mb-2">Total Artworks</h3>
            <p className="text-3xl font-bold">{stats.total_artworks}</p>
          </div>
          <div className="bg-[#260401] border border-[#E5961E] rounded-lg p-6 text-center">
            <h3 className="text-[#E5961E] text-sm uppercase mb-2">Total Sales</h3>
            <p className="text-3xl font-bold">${stats.total_sales.toFixed(2)}</p>
          </div>
          <div className="bg-[#260401] border border-[#E5961E] rounded-lg p-6 text-center">
            <h3 className="text-[#E5961E] text-sm uppercase mb-2">Pending Orders</h3>
            <p className="text-3xl font-bold">{stats.pending_orders}</p>
          </div>
        </div>

        <div className="bg-[#260401] border border-[#E5961E] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#E5961E] mb-4">Recent Orders</h2>
          {recent_orders.length > 0 ? (
            <div className="space-y-3">
              {recent_orders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 bg-black/30 rounded">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-400">
                      {order.items.length} item(s) - ${order.total_amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'pending' ? 'bg-yellow-600' :
                      order.status === 'paid' ? 'bg-green-600' :
                      order.status === 'shipped' ? 'bg-blue-600' :
                      order.status === 'delivered' ? 'bg-green-800' :
                      'bg-red-600'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No recent orders</p>
          )}
        </div>
      </div>
    </div>
  );
}