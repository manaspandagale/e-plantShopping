import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCart } from './CartSlice';

const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&q=80`;

export const plants = [
  { id: 1, name: 'Snake Plant', category: 'Indoor Plants', price: 15, image: photo('photo-1593482892290-f54927ae2b7c') },
  { id: 2, name: 'Spider Plant', category: 'Indoor Plants', price: 12, image: photo('photo-1485955900006-10f4d324d411') },
  { id: 3, name: 'Peace Lily', category: 'Indoor Plants', price: 18, image: photo('photo-1416879595882-3373a0480b5b') },
  { id: 4, name: 'Monstera', category: 'Indoor Plants', price: 28, image: photo('photo-1501004318641-b39e6451bec6') },
  { id: 5, name: 'ZZ Plant', category: 'Indoor Plants', price: 20, image: photo('photo-1459156212016-c812468e2115') },
  { id: 6, name: 'Pothos', category: 'Indoor Plants', price: 14, image: photo('photo-1463320726281-696a485928c7') },
  { id: 7, name: 'Lavender', category: 'Aromatic Plants', price: 16, image: photo('photo-1490750967868-88aa4486c946') },
  { id: 8, name: 'Rosemary', category: 'Aromatic Plants', price: 13, image: photo('photo-1466692476868-aef1dfb1e735') },
  { id: 9, name: 'Mint', category: 'Aromatic Plants', price: 9, image: photo('photo-1501004318641-b39e6451bec6') },
  { id: 10, name: 'Basil', category: 'Aromatic Plants', price: 10, image: photo('photo-1485955900006-10f4d324d411') },
  { id: 11, name: 'Jasmine', category: 'Aromatic Plants', price: 17, image: photo('photo-1490750967868-88aa4486c946') },
  { id: 12, name: 'Lemongrass', category: 'Aromatic Plants', price: 11, image: photo('photo-1416879595882-3373a0480b5b') },
  { id: 13, name: 'Aloe Vera', category: 'Medicinal Plants', price: 14, image: photo('photo-1501004318641-b39e6451bec6') },
  { id: 14, name: 'Tulsi', category: 'Medicinal Plants', price: 12, image: photo('photo-1466692476868-aef1dfb1e735') },
  { id: 15, name: 'Neem', category: 'Medicinal Plants', price: 19, image: photo('photo-1459156212016-c812468e2115') },
  { id: 16, name: 'Eucalyptus', category: 'Medicinal Plants', price: 21, image: photo('photo-1463320726281-696a485928c7') },
  { id: 17, name: 'Chamomile', category: 'Medicinal Plants', price: 16, image: photo('photo-1490750967868-88aa4486c946') },
  { id: 18, name: 'Sage', category: 'Medicinal Plants', price: 13, image: photo('photo-1485955900006-10f4d324d411') }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [addedToCart, setAddedToCart] = useState({});
  const handleAddToCart = plant => {
    if (addedToCart[plant.name] || cart.some(item => item.name === plant.name)) return;
    dispatch(addItem(plant));
    setAddedToCart(previous => ({ ...previous, [plant.name]: true }));
  };
  return <main className="product-list" id="products">
    <div className="section-heading"><h1>Our Plants</h1><p>Choose from 18 plants across three categories.</p></div>
    {['Indoor Plants', 'Aromatic Plants', 'Medicinal Plants'].map(category => (
      <section key={category} className="plant-category">
        <h2>{category}</h2>
        <div className="product-grid">
          {plants.filter(plant => plant.category === category).map(plant => (
            <article className="product-card" key={plant.id}>
              <img src={plant.image} alt={plant.name} loading="lazy" />
              <div className="product-details">
                <h3>{plant.name}</h3>
                <p className="price">${plant.price.toFixed(2)}</p>
                <button className="button" disabled={addedToCart[plant.name] || cart.some(item => item.name === plant.name)} onClick={() => handleAddToCart(plant)}>
                  {addedToCart[plant.name] || cart.some(item => item.name === plant.name) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    ))}
  </main>;
}
