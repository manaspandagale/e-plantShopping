import { useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';
import { selectCartQuantity } from './CartSlice';
import './App.css';

function Navbar({ onNavigate }) {
  const totalCartQuantity = useSelector(selectCartQuantity);
  return <nav className="navbar" aria-label="Main navigation">
    <button className="brand" onClick={() => onNavigate('home')}>🌿 Paradise Nursery</button>
    <div className="nav-links">
      <button onClick={() => onNavigate('home')}>Home</button>
      <button onClick={() => onNavigate('products')}>Plants</button>
      <button onClick={() => onNavigate('cart')} aria-label={`Cart, ${totalCartQuantity} items`}>🛒 Cart ({totalCartQuantity})</button>
    </div>
  </nav>;
}

export default function App() {
  const [page, setPage] = useState('home');
  const [showProductList, setShowProductList] = useState(false);
  const navigate = destination => { setPage(destination); setShowProductList(destination === 'products'); window.scrollTo(0, 0); };
  const handleGetStartedClick = () => {
    setShowProductList(true);
    setPage('products');
    window.scrollTo(0, 0);
  };
  return <>
    <Navbar onNavigate={navigate} />
    {page === 'home' && <main>
      <section className="background-image">
        <div className="hero-content">
          <h1>Welcome to Paradise Nursery</h1>
          <p>Where Green Meets Serenity. Discover plants to brighten your home and garden.</p>
          <button className="button" onClick={handleGetStartedClick}>Get Started</button>
        </div>
      </section>
      <AboutUs />
    </main>}
    {showProductList && page === 'products' && <ProductList onNavigate={navigate} />}
    {page === 'cart' && <CartItem onContinueShopping={handleGetStartedClick} />}
    <footer className="footer">© {new Date().getFullYear()} Paradise Nursery · Grow with us</footer>
  </>;
}
