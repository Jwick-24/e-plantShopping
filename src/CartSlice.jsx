import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Inicializa el carrito vacío
  },
  reducers: {
    // ➕ Agregar producto al carrito
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        // Si ya existe, aumenta la cantidad
        existingItem.quantity += 1;
      } else {
        // Si no existe, lo agrega con cantidad 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // ❌ Eliminar producto del carrito
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // 🔄 Actualizar cantidad del producto
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Extraer datos del payload
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Actualiza la cantidad
      }
    },
  },
});

// Exportar las acciones para usarlas en otros componentes
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Exportar el reducer por defecto para usarlo en store.js
export default CartSlice.reducer;
