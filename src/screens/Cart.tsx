import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {ICart} from '../models/ProductTypes';
import CartProductView from '../components/CartProductView';
import {COLORS} from '../assets/color';
import FooterButton from '../components/FooterButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../models/TabParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const Cart = ({}: Props) => {
  const cartProducts = useSelector((state: RootState) => state.cartsSlice);
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={cartProducts.cartData}
          keyExtractor={(item: ICart) => item.id}
          renderItem={({item}) => <CartProductView product={item} />}
        />
        {cartProducts.cartData.length > 0 && (
          <FooterButton
            value={cartProducts.cartTotalAmount.toFixed(2).toString()}
            title="Total:"
            btnOnClick={() => console.log('onclicked')}
            btnTitle="Complete"
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});

export default Cart;
