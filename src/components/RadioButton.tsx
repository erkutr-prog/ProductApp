import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {IProduct} from '../models/ProductTypes';
import {useSelector} from 'react-redux';
import {RootState} from '../screens/store';

type RadioButtonProps = {
  item: keyof IProduct;
  onSelected: (item: keyof IProduct) => void;
};

const RadioButton = (props: RadioButtonProps) => {
  const {item, onSelected} = props;
  const productState = useSelector((state: RootState) => state.productsSlice);

  return (
    <TouchableOpacity
      style={styles.radioButton}
      onPress={() => onSelected(item)}>
      <Text>{item}</Text>
      <View style={styles.button}>
        {productState.filterKey === item && (
          <View style={styles.selectedButton} />
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    padding: 12,
  },
  button: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: '#1976d2',
  },
});
export default RadioButton;
