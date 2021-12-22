import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Dimensions, Alert } from 'react-native';
import MapView, { Overlay } from 'react-native-maps';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import GetLocation from './components/GetLocation';

export default function FindStoreMap() {

    const [ address, setAddress ] = useState('');
    const [ location, setLocation ] = useState({
        latitude: 60.192059,
        longitude: 24.945831,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    const [ retailers, setRetailers ] = useState([]);

    //Gets user location data from GetLocation.js and then sets location
    const setUserLocation = async () => {
        let userLocation = await GetLocation()
        setLocation({
            ...location, latitude: userLocation.latitude,
            longitude: userLocation.longitude,
        });
        fetchRetailersUser();
    }

    //Gets location data of entered address, for some reason throws all entered addresses to Russia or Turkey
    const findAddress = () => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDB_uVOHN81EZbr2f5KcIhVotWJrWqkDYU`)
        .then(response => response.json())
        .then(responeJson => {
            const latitiude = responeJson.results[0].geometry.location.lat;
            const longitude = responeJson.results[0].geometry.location.lat;
            setLocation({
                latitude: latitiude,
                longitude: longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            })
        })
        .then(() => fetchRetailersUser())
        .catch((error) => {
            Error.error('Error', error.message);
        });
    }

    //Gets data of nearby retailers (uses 'store' because there is none for 'watch retailers')
    const fetchRetailersUser = () => {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude}${location.longitude}&radius=2000&type=store&key=AIzaSyDB_uVOHN81EZbr2f5KcIhVotWJrWqkDYU`)
        .then(response => response.json())
        .then(responeJson => setRetailers(responeJson.results))
        .catch((error) => {
            Alert.alert('Error', error.message);
        });
    }
        
  return (
    <View style={styles.container}>
        <MapView style={styles.map} region={location} >
            {retailers.map((marker, index) => (
                <MapView.Marker 
                    key={index}
                    coordinate={{ latitude: marker.geometry.location.lat, longitude: marker.geometry.location.lng }}
                    title={marker.name}
                    description={marker.vicinity}
                />
            ))}
            <MapView.Marker 
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title="Your Location"
            >
                <Ionicons name='person' color='red'  size={32} />
            </MapView.Marker>
        </MapView>
        <Overlay>
            <View style={{ flexDirection: 'row' }}>
                <TextInput placeholder='Find Address' onChangeText={address => setAddress(address)} value={address} style={ styles.inputField } />
                <Button 
                    onPress={findAddress} buttonStyle={ styles.buttons } icon={<Ionicons name='search-outline' color='#fff' size={24} />}
                />
            </View>
            <Button
                onPress={setUserLocation} title="Find My Location" buttonStyle={ styles.buttons } icon={<Ionicons name='location-outline' color='#fff' size={24} />}
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
      justifyContent: 'flex-end',
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      inputField: {
        width: 150,
        backgroundColor: '#fff',
        borderColor: 'green',
        borderWidth:1,
        margin: 1,
        paddingLeft: 5,
    },
    buttons: {
        backgroundColor: 'green',
        margin: 1
      },
  });