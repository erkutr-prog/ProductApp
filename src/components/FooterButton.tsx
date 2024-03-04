import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/color';

type Props = {
  btnOnClick: () => void;
  btnTitle: string;
  title: string;
  value: string;
};

const FooterButton = ({btnOnClick, btnTitle, title, value}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={{color: COLORS.blue, fontSize: 16}}>{title}</Text>
        <Text style={{fontWeight: 'bold'}}>{value + ' ₺'}</Text>
      </View>
      <TouchableHighlight
        style={styles.btnContainer}
        onPress={() => btnOnClick()}>
        <Text style={{color: COLORS.white}}>{btnTitle}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    borderTopColor: 'black',
  },
  description: {
    flexDirection: 'column',
    flex: 2,
  },
  btnContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default FooterButton;
