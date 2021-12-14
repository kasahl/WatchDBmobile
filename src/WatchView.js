import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList, Button, Image } from 'react-native';
import{ getDatabase, push, ref, onValue}  from"firebase/database";

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

        useEffect(() =>  {
            const itemsRef = ref(database, 'items/')
                onValue(itemsRef, (snapshot) => {
                    const data = snapshot.val();
                    setItems(Object.values(data));
                })
        }, []);

        return (
            <View style={styles.container}>
            <FlatList style={styles.list}
                keyExtractor={(item, index) => index}
                data={items}
                renderItem={({ item }) =>
                <View>
                    <Text>{item.brand} {item.model}</Text>
                    <Text>{item.color}, {item.material}, {item.year}</Text>
                    <Image source={{uri: `data:image/png;base64,${item.image}`}} style={{width: 200, height: 200}} />
                </View>
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
        justifyContent: 'center',
        },
    });
