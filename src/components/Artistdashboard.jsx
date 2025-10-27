import React from "react";

export default function ArtistDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#E5961E] mb-8">Artist Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#260401] border border-[#E5961E] rounded-lg p-6 text-center">
            <h3 className="text-[#E5961E] text-sm uppercase mb-2">Total Artworks</h3>
            <p className="text-3xl font-bold">24</p>
          </div>
          <div className="bg-[#260401] border border-[#E5961E] rounded-lg p-6 text-center">
            <h3 className="text-[#E5961E] text-sm uppercase mb-2">Total Sales</h3>
            <p className="text-3xl font-bold">$12,450</p>
          </div>
          <div className="bg-[#260401] border border-[#E5961E] rounded-lg p-6 text-center">
            <h3 className="text-[#E5961E] text-sm uppercase mb-2">Pending Orders</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>

        <div className="bg-[#260401] border border-[#E5961E] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#E5961E] mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-black/30 rounded">
              <p>New order for "Abstract Dreams"</p>
              <span className="text-gray-400 text-sm">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/30 rounded">
              <p>Artwork "Ocean Waves" sold</p>
              <span className="text-gray-400 text-sm">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}