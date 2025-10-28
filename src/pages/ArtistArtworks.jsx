import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ArtistArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image_url: ''
  });

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://finalproject-backend-1-ttj5.onrender.com/api/artist/artworks');
      setArtworks(response.data.artworks);
    } catch (err) {
      setError('Failed to load artworks');
      console.error('Error fetching artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingArtwork) {
        await axios.put(`https://finalproject-backend-1-ttj5.onrender.com/api/artist/artworks/${editingArtwork.id}`, formData);
        alert('Artwork updated successfully!');
      } else {
        await axios.post('https://finalproject-backend-1-ttj5.onrender.com/api/artist/artworks', formData);
        alert('Artwork created successfully!');
      }
      
      setShowForm(false);
      setEditingArtwork(null);
      setFormData({ title: '', description: '', price: '', category: '', image_url: '' });
      fetchArtworks();
    } catch (err) {
      alert('Failed to save artwork');
      console.error('Error saving artwork:', err);
    }
  };

  const handleEdit = (artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      description: artwork.description,
      price: artwork.price.toString(),
      category: artwork.category || '',
      image_url: artwork.image_url
    });
    setShowForm(true);
  };

  const handleDelete = async (artworkId) => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) {
      return;
    }
    
    try {
      await axios.delete(`https://finalproject-backend-1-ttj5.onrender.com/api/artist/artworks/${artworkId}`);
      alert('Artwork deleted successfully!');
      fetchArtworks();
    } catch (err) {
      alert('Failed to delete artwork');
      console.error('Error deleting artwork:', err);
    }
  };

  const toggleAvailability = async (artwork) => {
    try {
      await axios.put(`https://finalproject-backend-1-ttj5.onrender.com/api/artist/artworks/${artwork.id}`, {
        is_available: !artwork.is_available
      });
      fetchArtworks();
    } catch (err) {
      alert('Failed to update availability');
      console.error('Error updating availability:', err);
    }
  };

  if (loading) return <div className="loading">Loading artworks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="artist-artworks-container">
      <div className="artworks-header">
        <h1>My Artworks</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingArtwork(null);
            setFormData({ title: '', description: '', price: '', category: '', image_url: '' });
          }}
          className="btn-primary"
        >
          Add New Artwork
        </button>
      </div>

      {showForm && (
        <div className="artwork-form-overlay">
          <div className="artwork-form">
            <h2>{editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="price">Price ($):</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  <option value="painting">Painting</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="photography">Photography</option>
                  <option value="digital">Digital Art</option>
                  <option value="mixed">Mixed Media</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="image_url">Image URL:</label>
                <input
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingArtwork ? 'Update' : 'Create'} Artwork
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingArtwork(null);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="artworks-grid">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="artwork-card">
            <div className="artwork-image">
              <img src={artwork.image_url} alt={artwork.title} />
              <div className={`availability-badge ${artwork.is_available ? 'available' : 'unavailable'}`}>
                {artwork.is_available ? 'Available' : 'Sold'}
              </div>
            </div>
            
            <div className="artwork-info">
              <h3>{artwork.title}</h3>
              <p className="artwork-description">{artwork.description}</p>
              <p className="artwork-price">${artwork.price}</p>
              <p className="artwork-category">{artwork.category}</p>
              <p className="artwork-date">
                Created: {new Date(artwork.created_at).toLocaleDateString()}
              </p>
              
              <div className="artwork-actions">
                <button
                  onClick={() => handleEdit(artwork)}
                  className="btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleAvailability(artwork)}
                  className={`btn-toggle ${artwork.is_available ? 'btn-warning' : 'btn-success'}`}
                >
                  Mark as {artwork.is_available ? 'Sold' : 'Available'}
                </button>
                <button
                  onClick={() => handleDelete(artwork.id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {artworks.length === 0 && (
        <div className="no-artworks">
          <p>You haven't created any artworks yet.</p>
          <p>Click "Add New Artwork" to get started!</p>
        </div>
      )}
    </div>
  );
}