import React, { useEffect, useState, useRef } from 'react';
import { Camera } from "expo-camera";
import { Text, View, StyleSheet, StatusBar, TextInput, Button, Alert, Image } from 'react-native';

export default function OpenCamera() {

    const [ imageBase64, setImageBase64 ] = useState('');

    /*const [ cameraPermission, setCameraPermission ] = useState(null);

    useEffect(() => {
        askCameraPermission();
    })

    const askCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status == 'granted') {
          setCameraPermission( status == 'granted' );
        }
    }*/

    const snap = async () => {
        if (camera) {
          const picture = await camera.current.takePictureAsync({base64: true});
          setImageBase64(picture.base64);
        }
    }

    return (
        <View style={styles.container}>
                <View style={{ flex: 1 }}>
                { cameraPermission ? 
                  (
                    <View style={{ flex: 1 }}>
                      <Camera style={{ width: 200, height: 200 }} ref={camera} />
                      <View>
                        <Button title="Take Picture" onPress={snap} />
                      </View>
                      <View style={{ flex: 4 }}>
                        <Image style={{ flex: 1 }}
                          source={{uri: `data:image/gif;base64,${imageBase64}`}} />
                      </View>
                    </View>
                  ) : (
                    <Text>No camera permission</Text>
                  )}
                </View>
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
    inputContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    inputField: {
        width:200,
        borderBottomColor:'gray',
        borderWidth:1,
        margin: 5,
        paddingLeft: 5,
    },
  });