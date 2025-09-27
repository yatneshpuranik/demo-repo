import { createSlice } from "@reduxjs/toolkit";

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Use plural 'cartItems' for clarity
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // calculate item price
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // calculate shipping price
      state.shippingPrice = addDecimals(state.itemPrice >= 400 ? 0 : 10);

      // calculate tax price (18%)
      state.taxPrice = addDecimals(Number((state.itemPrice * 18) / 100));

      // calculate total price
      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // ✅ Save updated cart state to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
