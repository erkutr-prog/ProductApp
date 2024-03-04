import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  quantity: string;
  decProduct: () => void;
  incProduct: () => void;
};

const PlusMinus = ({quantity, decProduct, incProduct}: Props) => {
  return (
    <>
      <TouchableOpacity style={styles.buttons} onPress={() => decProduct()}>
        <Icon name="minus" style={{alignSelf: 'center'}} size={16} />
      </TouchableOpacity>
      <View style={styles.quantity}>
        <Text style={{color: COLORS.white}}>{quantity}</Text>
      </View>
      <TouchableOpacity style={styles.buttons} onPress={() => incProduct()}>
        <Icon name="plus" style={{alignSelf: 'center'}} size={16} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  quantity: {
    flex: 1,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});

export default PlusMinus;
