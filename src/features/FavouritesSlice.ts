import {createSlice} from '@reduxjs/toolkit';
import {IProduct} from '../models/ProductTypes';

export type ProductsSlice = {
  favorites: IProduct[];
  favedProducts: string[];
};

const initialState: ProductsSlice = {
  favorites: [],
  favedProducts: [],
};

const FavouritesSlice = createSlice({
  name: 'ProductsList',
  initialState: initialState,
  reducers: {
    addToFavorites(state, action) {
      state.favorites.push(action.payload);
      state.favedProducts.push(action.payload.id);
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(
        favorite => favorite.id !== action.payload,
      );
      state.favedProducts = state.favedProducts.filter(
        favedId => favedId !== action.payload,
      );
    },
  },
});

export const {addToFavorites, removeFromFavorites} = FavouritesSlice.actions;
export default FavouritesSlice.reducer;
