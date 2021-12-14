import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';

import HomeScreen from './src/HomeScreen';
import Ph from './src/Ph';
import Add from './src/Add';
import FindStoreMap from './src/FindStoreMap';
import WatchView from './src/WatchView';

const Drawer = createDrawerNavigator();

//Handles navigation

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Add item" component={Add} />
        <Drawer.Screen name="Find Store" component={FindStoreMap} />
        <Drawer.Screen name="View Watch" component={WatchView} />
        <Drawer.Screen name="Ph" component={Ph} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
