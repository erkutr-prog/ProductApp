import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {ICart} from '../models/ProductTypes';
import {COLORS} from '../assets/color';
import PlusMinus from './PlusMinus';
import {AppDispatch, RootState} from '../screens/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from '../features/CartSlice';

type Props = {
  product: ICart;
};

const CartProductView = ({product}: Props) => {
  const {name, price, quantity} = product;
  const dispatch = useDispatch<AppDispatch>();
  const cartState = useSelector((state: RootState) => state.cartsSlice);

  useEffect(() => {
    console.log(cartState.cartTotalAmount);
  }, [cartState]);

  function increaseProduct() {
    dispatch(increaseQuantity(product));
  }

  function decreaseProduct() {
    if (quantity === 1) {
      dispatch(removeProduct(product));
    } else {
      dispatch(decreaseQuantity(product));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.productNameContainer}>
        <Text style={{fontSize: 16}}>{name}</Text>

        <Text style={{color: COLORS.blue}}>{'$' + price.toString()}</Text>
      </View>

      <View style={styles.plusMinusContainer}>
        <PlusMinus
          quantity={quantity.toString()}
          incProduct={increaseProduct}
          decProduct={decreaseProduct}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  productNameContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  plusMinusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default CartProductView;
