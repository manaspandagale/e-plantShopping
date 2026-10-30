import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const plant = action.payload;
      const existing = state.items.find(item => item.name === plant.name);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...plant, quantity: 1 });
    },
    removeItem(state, action) {
      const name = typeof action.payload === 'string' ? action.payload : action.payload.name;
      state.items = state.items.filter(item => item.name !== name);
    },
    updateQuantity(state, action) {
      const { name, quantity } = action.payload;
      const item = state.items.find(plant => plant.name === name);
      if (!item) return;
      if (quantity <= 0) state.items = state.items.filter(plant => plant.name !== name);
      else item.quantity = quantity;
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectCart = state => state.cart.items;
export const selectCartQuantity = state => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = state => state.cart.items.reduce((total, item) => total + item.cost * item.quantity, 0);
export default cartSlice.reducer;
