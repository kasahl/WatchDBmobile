import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList, Alert, Image, KeyboardAvoidingView } from 'react-native';
import { ListItem, SearchBar, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import{ getDatabase, }  from"firebase/database";

import { initializeApp } from "firebase/app";

export default function WatchView() {

    const firebaseConfig = {
        apiKey: "AIzaSyDeDMA8a4xmgiED51iipi9BJm1dM-IK4aE",
        authDomain: "watchdb-a0222.firebaseapp.com",
        databaseURL: "https://watchdb-a0222-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "watchdb-a0222",
        storageBucket: "watchdb-a0222.appspot.com",
        messagingSenderId: "782456172187",
        appId: "1:782456172187:web:0b7eb98bae565330d7e03e"
    };
        
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const keyboardVerticalOffset = Platform.OS === 'android' ? -185 : 0
    
    const [ filerBy, setFilterBy ] = useState('');
    const [ filterValue, setFilterValue ] = useState('');
    const [ tempValue, setTempValue ] = useState('');
    const [ watchResponse, setWatchResponse ] = useState([]);

    //Gets data from Firebase database
    const findWatch = () => {
        setFilterValue(tempValue);
        fetch(`https://watchdb-a0222-default-rtdb.europe-west1.firebasedatabase.app/.json`)
        .then(response => response.json())
        .then(responseJson => setWatchResponse(Object.values(responseJson.items)))
        .then(setTempValue(null))
        .catch((error) => {
            Alert.alert('Error', error.message);
        })
    }

    //Logic for filtering from Json
    const watches = watchResponse.filter(x => x.brand === filterValue.trimEnd());

    return (
        <View>
            
            {/* Shows data form Firebase database in a FlatList */}
            <View style={{ height:'100%', backgroundColor: '#fff' }}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={watches}
                    renderItem={({ item, index }) =>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <View style={ styles.listTile }>
                                    <View style={{ width: '75%' }}>
                                        <View style={ styles.tileTitle }>
                                            <ListItem.Title>{item.brand} {item.model} {index}</ListItem.Title>
                                        </View>
                                        <View style={ styles.tileSubtitle }>
                                            <ListItem.Subtitle>Case Material: {item.material}</ListItem.Subtitle>
                                            <ListItem.Subtitle>Dial Color: {item.color}</ListItem.Subtitle>
                                            <ListItem.Subtitle>Release Year: {item.year}</ListItem.Subtitle>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Image source={{uri: `data:image/png;base64,${item.image}`}} style={styles.imageContainer} />
                                    </View>
                                </View>
                            </ListItem.Content>
                        </ListItem>
                    }
                />
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} width='100%' maxHeight='10%'>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 5}}>
                        <SearchBar
                            placeholder="Search"
                            onChangeText={setTempValue}
                            value={tempValue}
                            lightTheme="true"
                            round="true"
                        />
                    </View>
                    <View style={{ width: 67, height: '100%' }}>
                        <Button
                            onPress={findWatch}
                            icon={<Ionicons name='search-outline' color='#fff' size={32} />}
                            buttonStyle={{ height: '100%', backgroundColor: 'green' }}
                        />
                    </View>
                
                </View>
                </KeyboardAvoidingView>
            </View>        
            <StatusBar style="auto" />
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center'
        },
        listTile: {
            width: '100%', 
            flexDirection: 'row', 
            justifyContent: 'space-around'
        },
        tileTitle: {
            alignItems: 'flex-start', 
            justifyContent:'center', 
            flex: 1, 
            flexDirection:'column'
        },
        tileSubtitle: {
            alignItems: 'flex-start', 
            justifyContent:'center', 
            flex: 1, 
            flexDirection:'column',
            paddingLeft: 10
        },
        imageContainer: {
            width: 100, 
            height: 100, 
            borderWidth: 2, 
            borderColor: 'green',
            backgroundColor: '#fff'
        },
        searchContainer: {
            flex: 1,
            flexDirection: 'row',
            margin: 10,
        }
    });