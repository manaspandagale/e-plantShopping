import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCart } from './CartSlice';

const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&q=80`;

export const plantsArray = {
  'Indoor Plants': [
    { id: 1, name: 'Snake Plant', cost: 15, image: photo('photo-1593482892290-f54927ae2b7c') },
    { id: 2, name: 'Spider Plant', cost: 12, image: photo('photo-1485955900006-10f4d324d411') },
    { id: 3, name: 'Peace Lily', cost: 18, image: photo('photo-1416879595882-3373a0480b5b') },
    { id: 4, name: 'Monstera', cost: 28, image: photo('photo-1501004318641-b39e6451bec6') },
    { id: 5, name: 'ZZ Plant', cost: 20, image: photo('photo-1459156212016-c812468e2115') },
    { id: 6, name: 'Pothos', cost: 14, image: photo('photo-1463320726281-696a485928c7') }
  ],
  'Aromatic Plants': [
    { id: 7, name: 'Lavender', cost: 16, image: photo('photo-1490750967868-88aa4486c946') },
    { id: 8, name: 'Rosemary', cost: 13, image: photo('photo-1466692476868-aef1dfb1e735') },
    { id: 9, name: 'Mint', cost: 9, image: photo('photo-1501004318641-b39e6451bec6') },
    { id: 10, name: 'Basil', cost: 10, image: photo('photo-1485955900006-10f4d324d411') },
    { id: 11, name: 'Jasmine', cost: 17, image: photo('photo-1490750967868-88aa4486c946') },
    { id: 12, name: 'Lemongrass', cost: 11, image: photo('photo-1416879595882-3373a0480b5b') }
  ],
  'Medicinal Plants': [
    { id: 13, name: 'Aloe Vera', cost: 14, image: photo('photo-1501004318641-b39e6451bec6') },
    { id: 14, name: 'Tulsi', cost: 12, image: photo('photo-1466692476868-aef1dfb1e735') },
    { id: 15, name: 'Neem', cost: 19, image: photo('photo-1459156212016-c812468e2115') },
    { id: 16, name: 'Eucalyptus', cost: 21, image: photo('photo-1463320726281-696a485928c7') },
    { id: 17, name: 'Chamomile', cost: 16, image: photo('photo-1490750967868-88aa4486c946') },
    { id: 18, name: 'Sage', cost: 13, image: photo('photo-1485955900006-10f4d324d411') }
  ]
};

export default function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [addedToCart, setAddedToCart] = useState(() => Object.fromEntries(cartItems.map(item => [item.name, true])));
  const handleAddToCart = plant => {
    if (addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)) return;
    dispatch(addItem(plant));
    setAddedToCart(previous => ({ ...previous, [plant.name]: true }));
  };
  return <>
    <nav className="navbar product-navbar" aria-label="Plant shopping navigation">
      <button onClick={() => onNavigate('home')}>Home</button>
      <button onClick={() => onNavigate('products')}>Plants</button>
      <button onClick={() => onNavigate('cart')}>🛒 Cart ({totalQuantity})</button>
    </nav>
    <main className="product-list" id="products">
    <div className="section-heading"><h1>Our Plants</h1><p>Choose from 18 plants across three categories.</p></div>
    {Object.entries(plantsArray).map(([category, categoryPlants]) => (
      <section key={category} className="plant-category">
        <h2>{category}</h2>
        <div className="product-grid">
          {categoryPlants.map(plant => (
            <article className="product-card" key={plant.id}>
              <img src={plant.image} alt={plant.name} loading="lazy" />
              <div className="product-details">
                <h3>{plant.name}</h3>
                <p className="price">${plant.cost.toFixed(2)}</p>
                <button className="button" disabled={addedToCart[plant.name]} onClick={() => handleAddToCart(plant)}>
                  {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    ))}
  </main></>;
}
