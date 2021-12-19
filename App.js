import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from './src/HomeScreen';
import Add from './src/Add';
import FindStoreMap from './src/FindStoreMap';
import WatchView from './src/WatchView';

const Tab = createBottomTabNavigator(); 

//Handles navigation

export default function App() {
  return (
    <NavigationContainer>
      <Header
        backgroundColor="green"
        containerStyle={{
          height: '10%',
          paddingTop: '10%'
        }}
        centerComponent={<Text style={{ font: '',fontSize: 24, color: 'yellow', fontStyle: 'normal' }}>WatchDB</Text>}
        rightComponent={<Ionicons name='search-outline' size={32} color='white' />}
      />
      <Tab.Navigator initialRouteName="Home"
        screenOptions={({ route }) =>  ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Add item') {
              iconName = 'add-outline';
            } else if (route.name === 'Find Store') {
              iconName = 'map-outline';
            } else if (route.name === 'View Watch') {
              iconName = 'list-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />; 
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Add item" component={Add} options={{headerShown: false}}/>
        <Tab.Screen name="Find Store" component={FindStoreMap} options={{headerShown: false}}/>
        <Tab.Screen name="View Watch" component={WatchView} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
