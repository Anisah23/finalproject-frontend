import React, { useState, useEffect } from 'react';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockWishlist = [
      { id: 1, title: 'Abstract Dreams', artist: 'Marie Dubois', category: 'Abstract', price: 1200, image: '/api/placeholder/300/300', dateAdded: '2024-01-15' },
      { id: 3, title: 'Nature\'s Call', artist: 'Sophie Laurent', category: 'Landscape', price: 1500, image: '/api/placeholder/300/300', dateAdded: '2024-01-10' },
      { id: 5, title: 'Modern Geometry', artist: 'Pierre Blanc', category: 'Abstract', price: 2200, image: '/api/placeholder/300/300', dateAdded: '2024-01-08' }
    ];
    setWishlistItems(mockWishlist);
  }, []);

  const removeFromWishlist = (artworkId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== artworkId));
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1 className="wishlist-title">Ma Liste de Souhaits</h1>
        <p className="wishlist-count">{wishlistItems.length} œuvre(s) sauvegardée(s)</p>
      </div>

      <div className="wishlist-container">
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <h3 className="empty-title">Votre liste de souhaits est vide</h3>
            <p className="empty-text">Explorez notre galerie et ajoutez vos œuvres préférées</p>
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
                  <p className="wishlist-date">Ajouté le {new Date(artwork.dateAdded).toLocaleDateString('fr-FR')}</p>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromWishlist(artwork.id)}
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}