import {createSlice} from '@reduxjs/toolkit';
import {ICart} from '../models/ProductTypes';

export type ProductsSlice = {
  cartData: ICart[];
  cartTotalAmount: number;
};

const initialState: ProductsSlice = {
  cartData: [],
  cartTotalAmount: 0,
};

const ProductsSlice = createSlice({
  name: 'ProductsList',
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      state.cartData.push({...action.payload, quantity: 1});
      state.cartTotalAmount += parseFloat(action.payload.price);
    },
    increaseQuantity(state, action) {
      state.cartData.forEach(value => {
        if (value.id === action.payload.id) {
          state.cartTotalAmount += parseFloat(value.price);
          value.quantity += 1;
        }
      });
    },
    decreaseQuantity(state, action) {
      state.cartTotalAmount -= parseFloat(action.payload.price);
      state.cartData.forEach(value => {
        if (value.id === action.payload.id) {
          value.quantity -= 1;
        }
      });
    },
    removeProduct(state, action) {
      state.cartTotalAmount -=
        action.payload.quantity * parseFloat(action.payload.price);
      state.cartData = state.cartData.filter(
        value => value.id !== action.payload.id,
      );
    },
  },
});

export const {addToCart, increaseQuantity, decreaseQuantity, removeProduct} =
  ProductsSlice.actions;
export default ProductsSlice.reducer;
