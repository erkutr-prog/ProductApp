import {createSlice} from '@reduxjs/toolkit';
import {IProduct} from '../models/ProductTypes';

export type ProductsSlice = {
  products: IProduct[];
  filteredProducts: IProduct[];
  filterKey: keyof IProduct;
};

const initialState: ProductsSlice = {
  products: [],
  filteredProducts: [],
  filterKey: 'name',
};

const ProductsSlice = createSlice({
  name: 'ProductsList',
  initialState: initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    searchProducts(state, action) {
      state.filteredProducts = state.products.filter(value =>
        value[state.filterKey]
          .toLowerCase()
          .includes(action.payload.searchText.toLowerCase()),
      );
    },
    setFilterKey(state, action) {
      state.filterKey = action.payload;
    },
  },
});

export const {searchProducts, setProducts, setFilterKey} =
  ProductsSlice.actions;
export default ProductsSlice.reducer;
