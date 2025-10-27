import React, { useState, useEffect } from 'react';

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://finalproject-backend-1-ttj5.onrender.com';

  // Fetch artworks from API
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/collector/browse`);
        if (!response.ok) {
          throw new Error('Failed to fetch artworks');
        }
        const data = await response.json();
        const mappedArtworks = data.artworks.map(art => ({
          id: art.id,
          title: art.title,
          artist: art.artist,
          category: art.category,
          price: art.price,
          image: art.image_urls && art.image_urls.length > 0 ? art.image_urls[0] : '/api/placeholder/300/300'
        }));
        setArtworks(mappedArtworks);
        setFilteredArtworks(mappedArtworks);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching artworks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    let filtered = artworks;

    if (selectedCategory) {
      filtered = filtered.filter(artwork => artwork.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(artwork =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArtworks(filtered);
  }, [selectedCategory, searchTerm, artworks]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setIsDropdownOpen(false);
  };

  const categories = [...new Set(artworks.map(art => art.category))];

  if (loading) {
    return (
      <div className="gallery-page">
        <div className="gallery-container">
          <div className="gallery-header">
            <h1 className="gallery-title">Art Gallery</h1>
            <p className="gallery-subtitle">Loading artworks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-page">
        <div className="gallery-container">
          <div className="gallery-header">
            <h1 className="gallery-title">Art Gallery</h1>
            <p className="gallery-subtitle">Error loading artworks: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        <div className="gallery-header">
          <h1 className="gallery-title">Art Gallery</h1>
          <p className="gallery-subtitle">Discover unique artworks from talented artisans</p>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search artworks, artists, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
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
                <p className="artwork-price">${artwork.price}</p>
              </div>
            </div>
          ))}
        </div>
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
    </div>
  );
}