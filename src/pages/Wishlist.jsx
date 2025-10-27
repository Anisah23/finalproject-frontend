import React, { useState, useEffect } from 'react';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockWishlist = [
      { id: 1, title: 'Abstract Dreams', artist: 'Marie Dubois', category: 'Abstract', price: 1200, image: '/api/placeholder/300/300', dateAdded: '2024-01-15' },
      { id: 3, title: 'Nature\'s Call', artist: 'Sophie Laurent', category: 'Landscape', price: 1500, image: '/api/placeholder/300/300', dateAdded: '2024-01-10' },
      { id: 5, title: 'Modern Geometry', artist: 'Pierre Blanc', category: 'Abstract', price: 2200, image: '/api/placeholder/300/300', dateAdded: '2024-01-08' }
    ];
    setWishlistItems(mockWishlist);
    setFilteredItems(mockWishlist);
  }, []);

  useEffect(() => {
    let filtered = wishlistItems;

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [selectedCategory, searchTerm, wishlistItems]);

  const removeFromWishlist = (artworkId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== artworkId));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setIsDropdownOpen(false);
  };

  const categories = [...new Set(wishlistItems.map(item => item.category))];

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1 className="wishlist-title">My Wishlist</h1>
        <p className="wishlist-count">{wishlistItems.length} items in your wishlist</p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search wishlist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="floating-category-filter">
        <div className="category-dropdown">
          <button
            className="category-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Catégories {selectedCategory && `(${selectedCategory})`}
          </button>
          {isDropdownOpen && (
            <div className="category-menu">
              <button
                className="category-item"
                onClick={() => handleCategorySelect('')}
              >
                Toutes les catégories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className="category-item"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="wishlist-container">
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <h3 className="empty-title">Your wishlist is empty</h3>
            <p className="empty-text">Explore our gallery and add your favorite artworks</p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map(artwork => (
              <div key={artwork.id} className="wishlist-card">
                <img 
                  src={artwork.image} 
                  alt={artwork.title}
                  className="wishlist-image"
                />
                <div className="wishlist-info">
                  <h3 className="wishlist-artwork-title">{artwork.title}</h3>
                  <p className="wishlist-artist">{artwork.artist}</p>
                  <p className="wishlist-category">{artwork.category}</p>
                  <p className="wishlist-price">{artwork.price}€</p>
                  <p className="wishlist-date">Added on {new Date(artwork.dateAdded).toLocaleDateString('en-US')}</p>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromWishlist(artwork.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}