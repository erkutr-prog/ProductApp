import {View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';

const Favorites = () => {
  const favoritesState = useSelector(
    (state: RootState) => state.favouritesSlice,
  );
  return (
    <View>
      <SearchBar />
      <ProductList data={favoritesState.favorites} />
    </View>
  );
};

export default Favorites;
