import React, { useState, useEffect } from 'react';

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    artist: '',
    minPrice: '',
    maxPrice: ''
  });

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockArtworks = [
      { id: 1, title: 'Abstract Dreams', artist: 'Marie Dubois', category: 'Abstract', price: 1200, image: '/api/placeholder/300/300' },
      { id: 2, title: 'City Lights', artist: 'Jean Martin', category: 'Urban', price: 800, image: '/api/placeholder/300/300' },
      { id: 3, title: 'Nature\'s Call', artist: 'Sophie Laurent', category: 'Landscape', price: 1500, image: '/api/placeholder/300/300' },
      { id: 4, title: 'Portrait Study', artist: 'Marie Dubois', category: 'Portrait', price: 950, image: '/api/placeholder/300/300' },
      { id: 5, title: 'Modern Geometry', artist: 'Pierre Blanc', category: 'Abstract', price: 2200, image: '/api/placeholder/300/300' },
      { id: 6, title: 'Sunset Valley', artist: 'Sophie Laurent', category: 'Landscape', price: 1800, image: '/api/placeholder/300/300' }
    ];
    setArtworks(mockArtworks);
    setFilteredArtworks(mockArtworks);
  }, []);

  useEffect(() => {
    let filtered = artworks.filter(artwork => {
      const matchesCategory = !filters.category || artwork.category === filters.category;
      const matchesArtist = !filters.artist || artwork.artist === filters.artist;
      const matchesMinPrice = !filters.minPrice || artwork.price >= parseInt(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || artwork.price <= parseInt(filters.maxPrice);
      
      return matchesCategory && matchesArtist && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredArtworks(filtered);
  }, [filters, artworks]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: '', artist: '', minPrice: '', maxPrice: '' });
  };

  const uniqueCategories = [...new Set(artworks.map(art => art.category))];
  const uniqueArtists = [...new Set(artworks.map(art => art.artist))];

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1 className="gallery-title">Galerie d'Art</h1>
      </div>

      <div className="gallery-container">
        <div className="filters-sidebar">
          <h3 className="filters-title">Filtres</h3>
          
          <div className="filter-group">
            <label className="filter-label">Catégorie</label>
            <select 
              className="filter-select"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">Toutes</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Artiste</label>
            <select 
              className="filter-select"
              value={filters.artist}
              onChange={(e) => handleFilterChange('artist', e.target.value)}
            >
              <option value="">Tous</option>
              {uniqueArtists.map(artist => (
                <option key={artist} value={artist}>{artist}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Prix minimum (€)</label>
            <input 
              type="number"
              className="filter-input"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Prix maximum (€)</label>
            <input 
              type="number"
              className="filter-input"
              placeholder="10000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>
            Effacer les filtres
          </button>
        </div>

        <div className="artworks-grid">
          {filteredArtworks.map(artwork => (
            <div key={artwork.id} className="artwork-card">
              <img 
                src={artwork.image} 
                alt={artwork.title}
                className="artwork-image"
              />
              <div className="artwork-info">
                <h3 className="artwork-title">{artwork.title}</h3>
                <p className="artwork-artist">{artwork.artist}</p>
                <p className="artwork-category">{artwork.category}</p>
                <p className="artwork-price">{artwork.price}€</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}