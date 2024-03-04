import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import useProducts from '../hooks/useProducts';
import {COLORS} from '../assets/color';
import ProductList from '../components/ProductList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../models/TabParamsList';
import SearchBar from '../components/SearchBar';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({}: Props) => {
  const {data, loading, error} = useProducts();
  const productState = useSelector((state: RootState) => state.productsSlice);
  const navigation = useNavigation();

  if (error) {
    return (
      <View>
        <Text>Ürün bulunamadı hatası</Text>
      </View>
    );
  }

  const filterButton = () => {
    return (
      <View style={styles.filterSection}>
        <Text style={styles.filtersTitle}>Filters:</Text>
        <TouchableHighlight
          onPress={() => navigation.navigate('FilterModal')}
          style={styles.filtersBtnContainer}>
          <Text style={styles.filterBtnText}>Select Filter</Text>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <SearchBar />
      {loading ? (
        <ActivityIndicator color={COLORS.blue} />
      ) : (
        <ProductList
          data={
            productState.filteredProducts.length > 0
              ? productState.filteredProducts
              : data
          }
          headerComponent={filterButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  filtersTitle: {fontSize: 16, flex: 2, alignSelf: 'center'},
  filtersBtnContainer: {
    flex: 1,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBtnText: {textAlign: 'center'},
});

export default Home;
