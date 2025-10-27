import React, { useState, useEffect } from "react";

export default function CollectorDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 12,
    wishlistItems: 8,
    totalSpent: 3240
  });

  const [recentPurchases, setRecentPurchases] = useState([
    { id: 1, title: "Mountain Sunset", artist: "Artist Name", price: 450, date: "3 days ago" },
    { id: 2, title: "Ocean Dreams", artist: "Another Artist", price: 320, date: "1 week ago" }
  ]);

  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, title: 'Abstract Dreams', artist: 'Marie Dubois', category: 'Abstract', price: 1200, image: '/api/placeholder/300/300' },
    { id: 3, title: 'Nature\'s Call', artist: 'Sophie Laurent', category: 'Landscape', price: 1500, image: '/api/placeholder/300/300' },
    { id: 5, title: 'Modern Geometry', artist: 'Pierre Blanc', category: 'Abstract', price: 2200, image: '/api/placeholder/300/300' }
  ]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Collector Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back, art enthusiast!</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-title">Wishlist Items</h3>
            <p className="stat-value">{stats.wishlistItems}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Total Purchases</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Active Orders</h3>
            <p className="stat-value">3</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <p className="activity-info">Added "Mountain Sunset" to wishlist</p>
                <span className="activity-meta">2 hours ago</span>
              </div>
              <div className="activity-item">
                <p className="activity-info">Purchased "Ocean Dreams"</p>
                <span className="activity-meta">1 day ago</span>
              </div>
              <div className="activity-item">
                <p className="activity-info">Viewed artist profile: Marie Dubois</p>
                <span className="activity-meta">3 days ago</span>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h2 className="section-title">Recommended for You</h2>
            <div className="recommendations-list">
              <div className="recommendation-item">
                <img src="/api/placeholder/100/100" alt="Urban Nights" className="recommendation-image" />
                <div className="recommendation-info">
                  <h4 className="recommendation-title">Urban Nights</h4>
                  <p className="recommendation-artist">Jean Martin</p>
                  <p className="recommendation-price">$850</p>
                </div>
              </div>
              <div className="recommendation-item">
                <img src="/api/placeholder/100/100" alt="Forest Whisper" className="recommendation-image" />
                <div className="recommendation-info">
                  <h4 className="recommendation-title">Forest Whisper</h4>
                  <p className="recommendation-artist">Sophie Laurent</p>
                  <p className="recommendation-price">$1200</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">My Wishlist Preview</h2>
          <div className="wishlist-preview">
            {wishlistItems.slice(0, 3).map(item => (
              <div key={item.id} className="wishlist-preview-item">
                <img src={item.image} alt={item.title} className="wishlist-preview-image" />
                <div className="wishlist-preview-info">
                  <h4 className="wishlist-preview-title">{item.title}</h4>
                  <p className="wishlist-preview-artist">{item.artist}</p>
                  <p className="wishlist-preview-price">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-link">
            <a href="/wishlist" className="view-all-btn">View All Wishlist Items</a>
          </div>
        </div>
      </div>
    </div>
  );
}