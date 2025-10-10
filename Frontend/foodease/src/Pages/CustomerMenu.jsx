import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerService from '../Services/CustomerService';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CustomerMenu = () => {
  const { restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  const customerId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await CustomerService.getMenuItemsByRestaurant(restaurantId);
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  const handleAddToCart = (item) => {
    const exists = cartItems.find((i) => i.menuItemId === item.id);
    if (exists) {
      setCartItems((prev) =>
        prev.map((i) =>
          i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
    setShowCart(true);
  };

  const updateQuantity = (menuItemId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.menuItemId === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (menuItemId) => {
    setCartItems((prev) => prev.filter((item) => item.menuItemId !== menuItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleMakePayment = async () => {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
      alert('Please fill in all payment details.');
      return;
    }

    const orderPayload = {
      customerId,
      restaurantId: parseInt(restaurantId),
      orderItems: cartItems.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const orderResponse = await CustomerService.placeOrder(orderPayload);
      const orderId = orderResponse.id;

      const paymentPayload = {
        orderId,
        amount: getTotalPrice(),
        paymentStatus: 'SUCCESS',
      };

      await CustomerService.makePayment(paymentPayload);

      alert('Payment successful and order placed!');
      setCartItems([]);
      setShowCart(false);
      setShowPaymentModal(false);
      setCardDetails({ number: '', expiry: '', cvv: '' });
    } catch (error) {
      console.error('Error during payment/order:', error);
      alert('Payment failed or order could not be placed.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Menu Items</h2>
      {loading ? (
        <p>Loading menu...</p>
      ) : menuItems.length > 0 ? (
        <div className="row">
          {menuItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    {item.description}<br />
                    <strong>Price:</strong> ₹{item.price}<br />
                    <strong>Availability:</strong>{' '}
                    {item.available ? (
                      <span className="text-success">Available</span>
                    ) : (
                      <span className="text-danger">Not Available</span>
                    )}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.available}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No menu items available.</p>
      )}

      {/* Cart Side Panel */}
      <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.menuItemId} className="mb-3 border-bottom pb-2">
                  <h6>{item.name}</h6>
                  <p>₹{item.price}</p>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.menuItemId, parseInt(e.target.value))
                      }
                      className="form-control w-25"
                    />
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeItem(item.menuItemId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-3">
                <h5>Total: ₹{getTotalPrice()}</h5>
                <button className="btn btn-success me-2" onClick={() => setShowPaymentModal(true)}>
                  Place Order
                </button>
                <button className="btn btn-secondary" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Expiry Date</label>
              <input
                type="text"
                className="form-control"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                placeholder="MM/YY"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">CVV</label>
              <input
                type="password"
                className="form-control"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                placeholder="123"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleMakePayment}>
            Make Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerMenu;