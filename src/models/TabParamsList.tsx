import {IProduct} from './ProductTypes';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  App: undefined;
  BottomTabs: undefined;
  ProductDetails: {product: IProduct; isFav: boolean};
  FilterModal: undefined;
};
