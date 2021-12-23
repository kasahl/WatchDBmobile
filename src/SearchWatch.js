import React, { useState } from 'react';
import { View, StatusBar, FlatList, Alert, Image, KeyboardAvoidingView } from 'react-native';
import { ListItem, SearchBar, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import styles from './components/StyleComponent';

export default function WatchView() {

    const keyboardVerticalOffset = Platform.OS === 'android' ? -220 : 0
    
    const [ filterBy, setFilterBy ] = useState('brand');
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
    const watches = watchResponse.filter(data => data.brand === filterValue.trimEnd());

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
                            </ListItem.Content>
                        </ListItem>
                    }
                />
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} width='100%' maxHeight={200} >
                <Picker
                    style={{ margin: 10 }}
                    selectedValue={filterBy}
                    onValueChange={(itemValue, itemIndex) => setFilterBy(itemValue)}
                >
                    <Picker.Item label="Brand" value="brand" />
                    <Picker.Item label="Model" value="model" />
                    <Picker.Item label="Case Material" value="material" />
                    <Picker.Item label="Dial Color" value="color" />
                    <Picker.Item label="Release Year" value="year" />
                </Picker>
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
                    <View style={{ width: 67, height: 67 }}>
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
