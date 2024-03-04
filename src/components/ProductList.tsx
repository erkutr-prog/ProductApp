import React, {useState} from 'react';
import CardView from './CardView';
import {IProduct} from '../models/ProductTypes';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../screens/store';
import {addToFavorites, removeFromFavorites} from '../features/FavouritesSlice';

type ProductListProps = {
  data: IProduct[] | null;
  headerComponent?: () => React.ReactNode;
};

const ProductList = ({data, headerComponent}: ProductListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favouritesSlice);
  const [dataLimit, setDataLimit] = useState<number>(12);
  //const navigation = useNavigation();

  const onPressCard = (item: IProduct) => {
    if (favorites.favedProducts.includes(item.id)) {
      dispatch(removeFromFavorites(item.id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  return (
    <>
      <FlatList
        data={data?.slice(0, dataLimit)}
        keyExtractor={(item: IProduct) => item.id}
        renderItem={({item}) => (
          <CardView
            item={item}
            onPress={onPressCard}
            isFavorite={favorites.favedProducts.includes(item.id)}
          />
        )}
        numColumns={2}
        onEndReached={() => setDataLimit(prevLimit => prevLimit + 12)}
        ListHeaderComponent={headerComponent}
      />
    </>
  );
};

export default ProductList;
