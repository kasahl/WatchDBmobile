import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList, Button, Image } from 'react-native';
import { ListItem, Overlay } from 'react-native-elements';
import{ getDatabase, push, ref, onValue}  from"firebase/database";

import { initializeApp } from "firebase/app";
import { visible } from '@jest/types/node_modules/chalk';

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
        
        const [ visible, setVisible ] = useState(false);
        const [ items, setItems ] = useState([]);

        //Gets data from Firebase database
        useEffect(() =>  {
            const itemsRef = ref(database, 'items/')
                onValue(itemsRef, (snapshot) => {
                    const data = snapshot.val();
                    setItems(Object.values(data));
                })
        }, []);

        const toggleOverlay = () => {
            setVisible(!visible);
        }

        return (
            <View style={styles.container}>
            
                {/* Shows data form Firebase database in a FlatList */}
                <FlatList style={styles.list}
                    keyExtractor={(item, index) => index}
                    data={items}
                    renderItem={({ item, index }) =>
                        <ListItem bottomDivider onPress={toggleOverlay}>
                            <ListItem.Content>
                                <ListItem.Title>{item.brand} {item.model}</ListItem.Title>
                                <ListItem.Subtitle>{item.color} {item.material} {item.year}</ListItem.Subtitle>
                                <Image source={{uri: `data:image/png;base64,${item.image}`}} style={styles.imageContainer} />
                            </ListItem.Content>
                        </ListItem>
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
            alignItems: 'center',
            justifyContent: 'center'
        },
        list: {
            flex: 1,
            width: '100%',
            backgroundColor: 'lightgray'
        },
        imageContainer: {
            flex: 1,
            justifyContent: 'center',
            width: 100, 
            height: 100, 
            borderWidth: 1, 
            borderColor: 'black',
            backgroundColor: '#fff'
        }
    });
