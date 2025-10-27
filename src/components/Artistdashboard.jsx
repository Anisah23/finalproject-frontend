import React, { useState, useEffect } from "react";

export default function ArtistDashboard() {
  const [stats, setStats] = useState({
    totalArtworks: 24,
    totalSales: 12450,
    pendingOrders: 3
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'order', message: 'New order for "Abstract Dreams"', time: '2 hours ago' },
    { id: 2, type: 'sale', message: 'Artwork "Ocean Waves" sold', time: '1 day ago' },
    { id: 3, type: 'view', message: 'Profile viewed by collector', time: '3 days ago' }
  ]);

  const [artworks, setArtworks] = useState([
    { id: 1, title: 'Abstract Dreams', status: 'available', price: 1200, image: '/api/placeholder/300/300' },
    { id: 2, title: 'City Lights', status: 'sold', price: 800, image: '/api/placeholder/300/300' },
    { id: 3, title: 'Nature\'s Call', status: 'available', price: 1500, image: '/api/placeholder/300/300' }
  ]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Artist Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back, creative artist!</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-title">Total Artworks</h3>
            <p className="stat-value">{stats.totalArtworks}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Total Sales</h3>
            <p className="stat-value">${stats.totalSales.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Pending Orders</h3>
            <p className="stat-value">{stats.pendingOrders}</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <p className="activity-info">{activity.message}</p>
                  <span className="activity-meta">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <h2 className="section-title">Your Artworks</h2>
            <div className="artworks-preview">
              {artworks.map(artwork => (
                <div key={artwork.id} className="artwork-preview-item">
                  <img src={artwork.image} alt={artwork.title} className="artwork-preview-image" />
                  <div className="artwork-preview-info">
                    <h4 className="artwork-preview-title">{artwork.title}</h4>
                    <p className={`artwork-preview-status ${artwork.status === 'sold' ? 'sold' : 'available'}`}>
                      {artwork.status === 'sold' ? 'Sold' : 'Available'}
                    </p>
                    <p className="artwork-preview-price">${artwork.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="view-all-link">
              <a href="/manage-artworks" className="view-all-btn">Manage All Artworks</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}