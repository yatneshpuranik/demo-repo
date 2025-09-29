 export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};


export const updateCart = (state) =>
{
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
return state ; 
}