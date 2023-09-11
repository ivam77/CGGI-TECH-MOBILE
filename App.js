import React from 'react';
import NavigatorDrawer from './src/navigators/NavigatorsDrawer.js';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Provider store={store}>
        <NavigatorDrawer />
      </Provider>
    </NavigationContainer>
  );
}