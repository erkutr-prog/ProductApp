import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './screens/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from './models/TabParamsList';
import BottomTabs from './components/BottomTabs';
import ProductDetail from './screens/ProductDetails';
import {NavigationContainer} from '@react-navigation/native';
import FilterModal from './components/FilterModal';
import {StyleSheet, Text, View} from 'react-native';

const Stack = createNativeStackNavigator<AppStackParamList>();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="BottomTabs">
            <Stack.Group>
              <Stack.Screen
                options={{headerShown: false}}
                name="BottomTabs"
                component={BottomTabs}
              />
              <Stack.Screen name="ProductDetails" component={ProductDetail} />
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen
                name="FilterModal"
                component={FilterModal}
                options={{
                  headerRight: () => (
                    <View style={styles.modalExitBtnContainer}>
                      <Text>Save</Text>
                    </View>
                  ),
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  modalExitBtnContainer: {justifyContent: 'center', alignItems: 'center'},
});

export default App;
