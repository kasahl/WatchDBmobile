import React, { useEffect, useState } from 'react';
import { View, StatusBar, FlatList, Image } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { getDatabase, ref, onValue, remove }  from"firebase/database";
import styles from './components/StyleComponent';
import FirebaseConfig from './components/FirebaseConfig';

import { initializeApp } from "firebase/app";

export default function WatchView() {

    const firebaseConfig = {FirebaseConfig};
    
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

    return (
        <View>
        
            {/* Shows data form Firebase database in a FlatList */}
            <FlatList
                keyExtractor={(item, index) => index}
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
                                        console.log()
                                        return remove(ref(database, 'item/'))
                                    }}
                                />
                            }
                        >
                            <View style={ styles.listTile }>
                                <View style={{ width: '75%' }}>
                                    <View style={ styles.tileTitle }>
                                        <ListItem.Title>{item.brand} {item.model}</ListItem.Title>
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
