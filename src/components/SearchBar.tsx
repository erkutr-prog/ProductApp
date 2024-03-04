import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../screens/store';
import {searchProducts} from '../features/ProductsSlice';

const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    search();
  }, [searchText]);

  function search() {
    dispatch(searchProducts({key: 'name', searchText: searchText}));
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <Icon name="search" size={20} />
      </View>
      <TextInput
        onChangeText={(text: string) => setSearchText(text)}
        value={searchText}
        style={styles.searchInput}
        placeholder={'Search'}
      />
      <TouchableOpacity
        style={[
          styles.clearIcon,
          {display: searchText !== '' ? 'flex' : 'none'},
        ]}
        onPress={() => setSearchText('')}>
        <Icon name="close-outline" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: Dimensions.get('screen').width - 10,
    borderWidth: 3,
    borderColor: COLORS.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.gray,
  },
  searchIcon: {
    marginRight: 'auto',
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    zIndex: 1,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    padding: 5,
  },
  clearIcon: {
    marginRight: 'auto',
    alignSelf: 'center',
    backgroundColor: '#ffff',
    borderRadius: 10,
  },
});

export default SearchBar;
