import {combineReducers, configureStore} from '@reduxjs/toolkit';
import CartSlice from '../features/CartSlice';
import FavouritesSlice from '../features/FavouritesSlice';
import ProductsSlice from '../features/ProductsSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['productsSlice'],
};

const rootReducer = combineReducers({
  productsSlice: ProductsSlice,
  favouritesSlice: FavouritesSlice,
  cartsSlice: CartSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
