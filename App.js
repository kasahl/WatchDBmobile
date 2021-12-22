import React from 'react';
import { Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import Add from './src/Add';
import FindStoreMap from './src/FindStoreMap';
import WatchView from './src/WatchView';
import SearchWatch from './src/SearchWatch';

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
        centerComponent={<Text style={{ fontSize: 24, color: 'yellow', fontStyle: 'normal' }}>WatchDB</Text>}
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
            } else if (route.name === 'Search') {
              iconName = 'search-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />; 
          },
        })}>
        <Tab.Screen name="Home" component={WatchView} options={{headerShown: false}}/>
        <Tab.Screen name="Add item" component={Add} options={{headerShown: false}}/>
        <Tab.Screen name="Find Store" component={FindStoreMap} options={{headerShown: false}}/>
        <Tab.Screen name="Search" component={SearchWatch} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
