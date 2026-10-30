import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice';

export const plants = [
  { id: 1, name: 'Monstera Deliciosa', category: 'Indoor', price: 28, emoji: '🌿', description: 'Bold tropical leaves for bright rooms.' },
  { id: 2, name: 'Snake Plant', category: 'Indoor', price: 22, emoji: '🪴', description: 'Low-maintenance and beautifully upright.' },
  { id: 3, name: 'Peace Lily', category: 'Indoor', price: 26, emoji: '🌱', description: 'Elegant greenery with white blooms.' },
  { id: 4, name: 'Lavender', category: 'Outdoor', price: 18, emoji: '🪻', description: 'Fragrant flowers for sunny corners.' },
  { id: 5, name: 'Rose Bush', category: 'Outdoor', price: 24, emoji: '🌹', description: 'Classic color for patios and gardens.' },
  { id: 6, name: 'Sunflower', category: 'Outdoor', price: 16, emoji: '🌻', description: 'A cheerful addition to sunny spaces.' },
  { id: 7, name: 'Aloe Vera', category: 'Succulents', price: 15, emoji: '🌵', description: 'A resilient favorite for sunny windows.' },
  { id: 8, name: 'Echeveria', category: 'Succulents', price: 14, emoji: '🌵', description: 'Compact rosettes with charming shape.' },
  { id: 9, name: 'Jade Plant', category: 'Succulents', price: 19, emoji: '🪴', description: 'Glossy leaves and easy everyday care.' }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  return <section id="shop" className="section shop">
    <div className="section-heading"><span className="eyebrow">The collection</span><h2>Find your perfect plant</h2><p>Thoughtfully selected greenery for every kind of space.</p></div>
    {['Indoor', 'Outdoor', 'Succulents'].map(category => <div key={category} className="category">
      <h3>{category} Plants</h3>
      <div className="product-grid">{plants.filter(plant => plant.category === category).map(plant => {
        const quantity = items.find(item => item.id === plant.id)?.quantity ?? 0;
        return <article className="product-card" key={plant.id}>
          <div className="plant-visual" aria-hidden="true">{plant.emoji}</div>
          <div className="product-details"><span className="eyebrow">{plant.category}</span><h4>{plant.name}</h4><p>{plant.description}</p>
          <div className="product-bottom"><strong>${plant.price.toFixed(2)}</strong><button className="button small" onClick={() => dispatch(addItem(plant))}>Add to Cart{quantity ? ` (${quantity})` : ''}</button></div></div>
        </article>;
      })}</div>
    </div>)}
  </section>;
}
