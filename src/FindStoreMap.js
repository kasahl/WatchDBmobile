import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView, { Marker, Overlay } from 'react-native-maps';
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

    const setUserLocation = async () => {
        let userLocation = await GetLocation()
        setLocation({
            ...location, latitude: userLocation.latitude,
            longitude: userLocation.longitude,
        });
        fetchRetailers();
    }

    const fetchRetailers = async () => {
        const userLocation = await GetLocation();
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude}%2C${userLocation.longitude}&rankby=${RANKBY}&type=${TYPE}&key=AIzaSyDB_uVOHN81EZbr2f5KcIhVotWJrWqkDYU`)
        .then(response => response.json())
        .then(data => {
            setRetailers(data);
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
    }

    console.log(retailers)
        
  return (
    <View style={styles.container}>
        <Text>Find Watch Retailers</Text>
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
                    "sdftvgbhnj"
                )
            }
        </MapView>
        <Button 
            onPress={setUserLocation} title="Find my location" style={{ justifyContent: 'center' }} 
        />
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