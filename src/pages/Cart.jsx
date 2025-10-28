import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://finalproject-backend-1-ttj5.onrender.com/api/collector/cart');
      setCartItems(response.data.cart_items);
      setTotal(response.data.total);
    } catch (err) {
      setError('Failed to load cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await axios.put(`https://finalproject-backend-1-ttj5.onrender.com/api/collector/cart/${itemId}`, {
        quantity: quantity
      });
      fetchCart(); // Refresh cart
    } catch (err) {
      alert('Failed to update quantity');
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`https://finalproject-backend-1-ttj5.onrender.com/api/collector/cart/${itemId}`);
      fetchCart(); // Refresh cart
    } catch (err) {
      alert('Failed to remove item');
      console.error('Error removing item:', err);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!shippingAddress.trim()) {
      alert('Please enter a shipping address');
      return;
    }

    try {
      setCheckoutLoading(true);
      const response = await axios.post('https://finalproject-backend-1-ttj5.onrender.com/api/collector/orders', {
        shipping_address: shippingAddress,
        payment_method: paymentMethod
      });
      
      alert('Order placed successfully!');
      navigate('/collector/orders');
    } catch (err) {
      alert('Failed to place order');
      console.error('Error placing order:', err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading cart...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/gallery')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.artwork.image_url} alt={item.artwork.title} />
                </div>
                
                <div className="item-details">
                  <h3>{item.artwork.title}</h3>
                  <p>by {item.artwork.artist_name}</p>
                  <p className="item-price">${item.artwork.price}</p>
                </div>
                
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="checkout-section">
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="total">
                <strong>Total: ${total.toFixed(2)}</strong>
              </div>
            </div>
            
            <form onSubmit={handleCheckout} className="checkout-form">
              <div className="form-group">
                <label htmlFor="shipping">Shipping Address:</label>
                <textarea
                  id="shipping"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your shipping address..."
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="payment">Payment Method:</label>
                <select
                  id="payment"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="checkout-btn"
                disabled={checkoutLoading}
              >
                {checkoutLoading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}