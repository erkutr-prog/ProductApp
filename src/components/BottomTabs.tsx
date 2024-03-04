import React from 'react';
import Home from '../screens/Home';
import BottomTabButton from './BottomTabButton';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../assets/color';
import Cart from '../screens/Cart';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../screens/store';
import {RootStackParamList} from '../models/TabParamsList';

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const BottomTabs = () => {
  const cartState = useSelector((state: RootState) => state.cartsSlice);
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: COLORS.blue},
        headerTitleStyle: {color: COLORS.white},
        headerTitleAlign: 'left',
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={35} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <Icon name={focused ? 'basket' : 'basket-outline'} size={35} />
          ),
          tabBarShowLabel: false,
          tabBarBadge:
            cartState.cartData.length > 0
              ? cartState.cartData.length.toString()
              : undefined,
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <Icon name={focused ? 'star' : 'star-outline'} size={35} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <Icon name={focused ? 'account' : 'account-outline'} size={35} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
