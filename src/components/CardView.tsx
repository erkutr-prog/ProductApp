/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {IProduct} from '../models/ProductTypes';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../screens/store';
import {addToCart, increaseQuantity} from '../features/CartSlice';
import {useNavigation} from '@react-navigation/native';

type Props = {
  item: IProduct;
  onPress: (item: IProduct) => void;
  isFavorite: boolean;
};

const CardView = ({item, isFavorite, onPress}: Props) => {
  const {name, image, price} = item;
  const dispatch = useDispatch<AppDispatch>();
  const cartState = useSelector((state: RootState) => state.cartsSlice);
  const navigation = useNavigation();

  const addProductToCart = () => {
    const isInCart = cartState.cartData.some(value => value.id === item.id);
    if (isInCart) {
      dispatch(increaseQuantity(item));
    } else {
      dispatch(addToCart(item));
    }
  };

  function navigateToDetails() {
    navigation.navigate('ProductDetails', {
      product: item,
      isFavorite: isFavorite,
    });
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => navigateToDetails()}
        style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={{uri: image}} style={styles.img} />
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={{marginLeft: 'auto', marginRight: 10}}>
            <Icon
              name={'star'}
              size={25}
              color={isFavorite ? 'yellow' : 'gray'}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', margin: 10, gap: 10}}>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.blue,
            }}>
            {'$' + price.toString()}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: 11,
              flex: 0.8,
            }}
            numberOfLines={2}>
            {name}
          </Text>

          <TouchableHighlight
            onPress={() => addProductToCart()}
            style={{
              width: '100%',
              height: 30,
              backgroundColor: COLORS.blue,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              borderRadius: 5,
            }}>
            <Text style={{alignSelf: 'center', color: COLORS.white}}>
              Add To Cart
            </Text>
          </TouchableHighlight>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffff',
    flexDirection: 'column',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowColor: 'black',
    marginHorizontal: 20,
    marginVertical: 5,
    width: Dimensions.get('screen').width * 0.4,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    width: Dimensions.get('screen').width * 0.4,
  },
  imgContainer: {
    margin: 10,
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.4,
    height: 150,
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginHorizontal: 10,
  },
});

export default CardView;
