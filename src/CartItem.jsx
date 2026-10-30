import { useDispatch } from 'react-redux';
import { decrementItem, incrementItem, removeItem } from './CartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return <article className="cart-item">
    <div className="cart-plant" aria-hidden="true">{item.emoji}</div>
    <div className="cart-item-details"><h3>{item.name}</h3><p>${item.price.toFixed(2)} each</p><button className="text-button" onClick={() => dispatch(removeItem(item.id))}>Remove</button></div>
    <div className="quantity-controls">
      <button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(decrementItem(item.id))}>−</button>
      <span aria-label="Quantity">{item.quantity}</span>
      <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(incrementItem(item.id))}>+</button>
    </div>
    <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
  </article>;
}
