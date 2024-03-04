import {View, FlatList} from 'react-native';
import React from 'react';
import {IProduct} from '../models/ProductTypes';
import RadioButton from './RadioButton';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../screens/store';
import {setFilterKey} from '../features/ProductsSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../models/TabParamsList';

type Props = NativeStackScreenProps<AppStackParamList, 'FilterModal'>;

const data: Partial<keyof IProduct>[] = ['name', 'model', 'brand'];

const FilterModal = ({}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  function onSelectFilterKey(item: keyof IProduct) {
    dispatch(setFilterKey(item));
  }
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <RadioButton item={item} onSelected={onSelectFilterKey} />
        )}
      />
    </View>
  );
};

export default FilterModal;
