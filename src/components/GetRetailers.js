import { useEffect, useState } from "react";
import { Alert } from "react-native";
import GetLocation from "./GetLocation";

export default function GetRetailers() {

    const [ retailers, setRetailers ] = useState([]);
    const TYPE = 'restaurant'
    const RANKBY = 'distance'

    /*const userLocation = await GetLocation();
    const api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude}%2C${userLocation.longitude}&rankby=${RANKBY}&type=${TYPE}&key=AIzaSyDB_uVOHN81EZbr2f5KcIhVotWJrWqkDYU`
    let response = await fetch(api_url);
    const result = await response.json();

    if (response.ok) {
        console.log('Retailers found: ' + result.results.length)
        let retailers = await result.results

        return retailers
    }*/

    useEffect(() => {
        fetchRetailers
    })

    console.log(retailers);

    return retailers
}