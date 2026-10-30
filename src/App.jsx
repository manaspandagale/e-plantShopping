import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';
import { clearCart, selectCartCount, selectCartItems, selectCartTotal } from './CartSlice';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const goTo = next => { setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <>
    <header className="site-header"><button className="brand" onClick={() => goTo('home')}><span>✿</span> Paradise Nursery</button>
      <nav aria-label="Main navigation"><button onClick={() => goTo('home')}>Home</button><button onClick={() => goTo('shop')}>Plants</button><button onClick={() => goTo('about')}>About</button><button className="cart-nav" onClick={() => goTo('cart')} aria-label={`Cart with ${count} items`}>🛒 Cart <span className="cart-count">{count}</span></button></nav>
    </header>
    {page === 'home' && <><section className="hero"><div className="hero-copy"><span className="eyebrow">Welcome to Paradise Nursery</span><h1>A little green goes a long way.</h1><p>Beautiful plants for brighter spaces. Find your new leafy companion today.</p><button className="button" onClick={() => goTo('shop')}>Shop plants →</button></div><div className="hero-plant" aria-hidden="true">🪴</div></section><AboutUs /><ProductList /></>}
    {page === 'shop' && <ProductList />}
    {page === 'about' && <AboutUs />}
    {page === 'cart' && <main className="section cart-page"><div className="section-heading"><span className="eyebrow">Your selection</span><h1>Shopping cart</h1><p>{count} plant{count === 1 ? '' : 's'} in your cart</p></div>
      {items.length === 0 ? <div className="empty-cart"><div>🪴</div><h2>Your cart is waiting to bloom</h2><p>Add a few plants to get started.</p><button className="button" onClick={() => goTo('shop')}>Browse plants</button></div> :
      <div className="cart-layout"><div className="cart-list">{items.map(item => <CartItem key={item.id} item={item} />)}</div><aside className="order-summary"><h2>Order summary</h2><div className="summary-line"><span>Items ({count})</span><span>${total.toFixed(2)}</span></div><div className="summary-line total"><strong>Total</strong><strong>${total.toFixed(2)}</strong></div><button className="button full" onClick={() => window.alert('Checkout is coming soon!')}>Checkout</button><button className="button secondary full" onClick={() => goTo('shop')}>Continue shopping</button><button className="text-button" onClick={() => dispatch(clearCart())}>Clear cart</button></aside></div>}</main>}
    <footer className="footer"><strong>✿ Paradise Nursery</strong><span>Grow something wonderful. © {new Date().getFullYear()}</span></footer>
  </>;
}
