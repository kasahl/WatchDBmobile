import * as Location from 'expo-location';

export default async function GetLocation() {

    //Request location data permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.error('Location permission denied');
        return;
    }

    //Gets latitude and longitude data and puts it in userLocation
    let location = await Location.getCurrentPositionAsync({});
    let userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    }

    return userLocation
    
}