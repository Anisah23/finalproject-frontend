import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const { isCollector } = useAuth();

  useEffect(() => {
    fetchArtworks();
  }, [searchTerm, category]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (category) params.append('category', category);
      
      const response = await axios.get(`https://finalproject-backend-1-ttj5.onrender.com/api/collector/gallery?${params}`);
      setArtworks(response.data.artworks);
    } catch (err) {
      setError('Failed to load artworks');
      console.error('Error fetching artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (artworkId) => {
    if (!isCollector) return;
    
    try {
      await axios.post('https://finalproject-backend-1-ttj5.onrender.com/api/collector/cart', {
        artwork_id: artworkId,
        quantity: 1
      });
      alert('Added to cart successfully!');
    } catch (err) {
      alert('Failed to add to cart');
      console.error('Error adding to cart:', err);
    }
  };

  const addToWishlist = async (artworkId) => {
    if (!isCollector) return;
    
    try {
      await axios.post('https://finalproject-backend-1-ttj5.onrender.com/api/collector/wishlist', {
        artwork_id: artworkId
      });
      alert('Added to wishlist successfully!');
    } catch (err) {
      alert('Failed to add to wishlist');
      console.error('Error adding to wishlist:', err);
    }
  };

  if (loading) return <div className="loading">Loading artworks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Art Gallery</h1>
        
        <div className="gallery-filters">
          <input
            type="text"
            placeholder="Search artworks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            <option value="painting">Painting</option>
            <option value="sculpture">Sculpture</option>
            <option value="photography">Photography</option>
            <option value="digital">Digital Art</option>
            <option value="mixed">Mixed Media</option>
          </select>
        </div>
      </div>

      <div className="artworks-grid">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="artwork-card">
            <div className="artwork-image">
              <img src={artwork.image_url} alt={artwork.title} />
            </div>
            
            <div className="artwork-info">
              <h3>{artwork.title}</h3>
              <p className="artist-name">by {artwork.artist_name}</p>
              <p className="artwork-description">{artwork.description}</p>
              <p className="artwork-price">${artwork.price}</p>
              
              {isCollector && (
                <div className="artwork-actions">
                  <button
                    onClick={() => addToCart(artwork.id)}
                    className="btn-primary"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => addToWishlist(artwork.id)}
                    className="btn-secondary"
                  >
                    Add to Wishlist
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {artworks.length === 0 && (
        <div className="no-artworks">
          <p>No artworks found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}