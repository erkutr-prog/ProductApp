import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../models/TabParamsList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';
import {addToFavorites, removeFromFavorites} from '../features/FavouritesSlice';
import FooterButton from '../components/FooterButton';
import {addToCart, increaseQuantity} from '../features/CartSlice';

type Props = NativeStackScreenProps<AppStackParamList, 'ProductDetails'>;

const ProductDetails = ({route, navigation}: Props) => {
  const cartState = useSelector((state: RootState) => state.cartsSlice);
  const dispatch = useDispatch<AppDispatch>();
  const product = route.params.product;
  const [isFavorite, setFavorite] = useState<boolean>(route.params.isFav);

  useEffect(() => {
    navigation.setOptions({
      title: product.name,
      headerTitleStyle: {
        color: COLORS.white,
      },
      headerTitleAlign: 'left',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={25} color={COLORS.white} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: COLORS.blue,
      },
    });
  }, []);

  function toggleFav() {
    if (isFavorite) {
      setFavorite(false);
      dispatch(removeFromFavorites(product.id));
    } else {
      setFavorite(true);
      dispatch(addToFavorites(route.params.product));
    }
  }

  function addProductToCard() {
    const isInCart = cartState.cartData.some(value => value.id === product.id);
    if (isInCart) {
      dispatch(increaseQuantity(product));
    } else {
      dispatch(addToCart(product));
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.imgContainer}>
          <Image src={product.image} style={styles.img} />
          <TouchableOpacity
            onPress={() => toggleFav()}
            style={{marginLeft: 'auto', marginRight: 10, marginTop: 10}}>
            <Icon
              name={'star'}
              size={25}
              color={isFavorite ? 'yellow' : 'gray'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.textView}>
          <Text style={styles.text}>{product.name}</Text>
        </View>

        <View style={styles.textView}>
          <Text>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.textView}>
        <FooterButton
          title="Price"
          value={Number(product.price).toFixed(2).toString()}
          btnTitle="Add To Cart"
          btnOnClick={() => addProductToCard()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 10,
    flexDirection: 'column',
    paddingTop: 10,
    gap: 100,
  },
  imgContainer: {
    marginHorizontal: 10,
    alignSelf: 'center',
    width: Dimensions.get('screen').width,
    height: 300,
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginHorizontal: 10,
    aspectRatio: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textView: {
    paddingBottom: 10,
  },
});

export default ProductDetails;
