import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, Image } from 'react-native';
import MapView, { Marker, Overlay } from 'react-native-maps';
import { FAB } from 'react-native-elements';
import * as Location from 'expo-location';


import GetLocation from './components/GetLocation';

const TYPE = 'restaurant'
const RANKBY = 'distance'

export default function FindStoreMap() {

    const [ location, setLocation ] = useState({
        latitude: 60.192059,
        longitude: 24.945831,
        latitudeDelta: 0.2,
        longitudeDelta: 0.1,
    });

    const [ retailers, setRetailers ] = useState([]);

    //Gets user location data from GetLocation.js and then retailer location data around the user
    const setUserLocation = async () => {
        let userLocation = await GetLocation()
        setLocation({
            ...location, latitude: userLocation.latitude,
            longitude: userLocation.longitude,
        });
        fetchRetailers();
    }

    //Gets data of nearby retailers (uses 'restaurants' as test data)
    const fetchRetailers = async () => {
        const userLocation = await GetLocation();
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude}%2C${userLocation.longitude}&rankby=${RANKBY}&type=${TYPE}&key=AIzaSyDB_uVOHN81EZbr2f5KcIhVotWJrWqkDYU`)
        .then(response => response.json())
        .then(responeJson => setRetailers(Object.values(responeJson)))
        .catch((error) => {
            Alert.alert('Error', error.message);
        });
    }

    console.log(retailers)
        
  return (
    <View style={styles.container}>
        <MapView style={styles.map} region={location} >
            { Location.useForegroundPermissions ? 
                (
                    <Marker 
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude
                        }}
                        title='Your Location'
                    />
                ) : (
                 ""
                )
            }
        </MapView>
        <Overlay>
            <Button
                onPress={setUserLocation} title="Find my location" style={{ justifyContent: 'bottom' }} 
            />
        </Overlay>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
  });