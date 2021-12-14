import * as Location from 'expo-location';

export default async function GetLocation() {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.error('Location permission denied');
        return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    }

    return userLocation
    
}