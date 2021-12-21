import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, FlatList, Image } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { getDatabase, ref, onValue}  from"firebase/database";

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
    
    const [ items, setItems ] = useState([]);

    //Gets data from Firebase database
    useEffect(() =>  {
        const itemsRef = ref(database, 'items/')
            onValue(itemsRef, (snapshot) => {
                const data = snapshot.val();
                setItems(Object.values(data));
            })
    }, []);

    const deleteItem = () => {
        console.log(index)
    }

    return (
        <View>
        
            {/* Shows data form Firebase database in a FlatList */}
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={items}
                renderItem={({ item, index }) =>
                    <ListItem.Content>
                        <ListItem.Swipeable
                            paddingTop={2}
                            rightContent={
                                <Button
                                    icon={{ name: 'delete', color: 'white', size: 32 }}
                                    buttonStyle={{ height: '100%', backgroundColor: 'red', marginTop: 2 }}
                                    onPress={() => {
                                        setItems(prevItems => prevItems.filter((_item, _Index) => _Index !== index));
                                     }}
                                />
                            }
                        >
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
                        </ListItem.Swipeable>
                    </ListItem.Content>
                }
            />
        <StatusBar style="auto" />
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'flex-start',
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
            backgroundColor: '#fff',
        }
    });
