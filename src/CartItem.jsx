import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, selectCart, selectCartTotal } from './CartSlice';

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalCartAmount = useSelector(selectCartTotal);

  const handleIncrement = item => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };
  const handleDecrement = item => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };
  const handleDelete = item => dispatch(removeItem(item.name));
  const handleCheckout = () => window.alert('Coming Soon');

  return <main className="cart-page">
    <h1>Your Shopping Cart</h1>
    {cart.length === 0 ? <p>Your cart is empty. Add some plants!</p> : (
      <div className="cart-list">
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>Unit Price: ${item.price.toFixed(2)}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>+</button>
              </div>
              <button className="delete-button" onClick={() => handleDelete(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}
    <h2 className="cart-total">Total Cart Amount: ${totalCartAmount.toFixed(2)}</h2>
    <div className="cart-actions">
      <button className="button" onClick={handleCheckout}>Checkout</button>
      <button className="button secondary" onClick={onContinueShopping}>Continue Shopping</button>
    </div>
  </main>;
}
