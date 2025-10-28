import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://finalproject-backend-1-ttj5.onrender.com/api/collector/wishlist');
      setWishlistItems(response.data.wishlist_items);
    } catch (err) {
      setError('Failed to load wishlist');
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await axios.delete(`https://finalproject-backend-1-ttj5.onrender.com/api/collector/wishlist/${itemId}`);
      fetchWishlist(); // Refresh wishlist
    } catch (err) {
      alert('Failed to remove from wishlist');
      console.error('Error removing from wishlist:', err);
    }
  };

  const addToCart = async (artworkId) => {
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

  if (loading) return <div className="loading">Loading wishlist...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty</p>
          <p>Browse the gallery to add items to your wishlist</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div className="item-image">
                <img src={item.artwork.image_url} alt={item.artwork.title} />
              </div>
              
              <div className="item-info">
                <h3>{item.artwork.title}</h3>
                <p className="artist-name">by {item.artwork.artist_name}</p>
                <p className="item-description">{item.artwork.description}</p>
                <p className="item-price">${item.artwork.price}</p>
                
                <div className="item-actions">
                  <button
                    onClick={() => addToCart(item.artwork.id)}
                    className="btn-primary"
                    disabled={!item.artwork.is_available}
                  >
                    {item.artwork.is_available ? 'Add to Cart' : 'Sold Out'}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="btn-secondary"
                  >
                    Remove from Wishlist
                  </button>
                </div>
                
                <p className="added-date">
                  Added on {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}