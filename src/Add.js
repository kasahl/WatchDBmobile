import React, { useEffect, useState, useRef, Component } from 'react';
import { Text, View, StyleSheet, StatusBar, TextInput, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { getMetadata, push, ref, onValue, getDatabase, set } from 'firebase/database';
import { getStorage } from 'firebase/storage';

import { initializeApp } from "firebase/app";

export default function Add() {

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
    
  ref(database, 'items/')
    
  const [ brand, setBrand ] = useState('');
  const [ model, setModel ] = useState('');
  const [ material, setMaterial ] = useState('');
  const [ color, setColor ] = useState('');
  const [ year, setYear ] = useState('');

  const [ cameraPermission, setCameraPermission ] = useState(null);
  const [ galleryPermission, setGalleryPermission ] = useState(null);
  const [ imageBase64, setImageBase64 ] = useState('');

  const camera = useRef(null);
    
  //Pushes currents states into database
  const saveItem = () => {
    push(ref(database, 'items/'), {
      'brand': brand.trimEnd(), 'model': model.trimEnd(), 'color': color.trimEnd(),
      'material': material.trimEnd(), 'year': year.trimEnd(), 'image': imageBase64, 
    });
    Alert.alert(
      "Save",
      "Your item has been saved!"
    )
    setBrand(null)
    setModel(null)
    setMaterial(null)
    setColor(null)
    setYear(null)
    setImageBase64(null)
  }

  //Asks for camera permission
  const askCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission( status == 'granted' );
    setGalleryPermission( status == 'null' );
  }

  //Asks for phone media library permission and activates pickImage function
  const askGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setGalleryPermission( status == 'granted' );
    setCameraPermission( status == 'null' );
    try {
      pickImage();
    } catch (error) {
      console.error(error.message);
    }
  }

  //Async function for taking the picture with the camera and saving it as base64 encoded
  const snap = async () => {
    if (camera) {
      const picture = await camera.current.takePictureAsync({base64: true});
      setImageBase64(picture.base64);
    }
  }

  //Async function for choosing an image from the phone's storage and saves it as base64 encoded
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageBase64(result.base64);
    }
  };

  return (
    <View>
      <View style={{ height: '100%' }}>
        <View style={{ backgroundColor: 'teal', alignItems: 'center'}}>
          <Image 
            style={{ height: 200, width: 200}} 
            source={{uri: `data:image/gif;base64,${imageBase64}`}} 
          />
        </View> 
        <View>
          <Button onPress={askGalleryPermission} title="Choose a Picture" />
        </View>
        {/* View and Button for taking a picture with the camera */}
        <View style={{ backgroundColor: 'lightgreen'}}>
          { cameraPermission ? 
            (
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Camera style={{ width: 200, height: 200 }} ref={camera} />
                <View>
                  <Button title="Take Picture" onPress={snap} />
                </View>
              </View>
            ) : (
              <Button onPress={askCameraPermission} title="Open Camera" />
            )}
        </View>

      {/* View and Button for choosing image from phone storage */}
        <View style={{ backgroundColor: 'lightblue'}}>
          <View>
            { galleryPermission ? 
              (
                <View style={{ }}>
                  <Button onPress={pickImage} title="Choose a Picture" />
                </View>
              ) : ('')}
          </View>
        </View>
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputField} placeholder='Brand' onChangeText={brand => setBrand(brand)} value={brand} />
            <TextInput style={styles.inputField} placeholder='Model' onChangeText={model => setModel(model)} value={model} />
            <TextInput style={styles.inputField} placeholder='Dial Color' onChangeText={color => setColor(color)} value={color} />
            <TextInput style={styles.inputField} placeholder='Case Material' onChangeText={material => setMaterial(material)} value={material} />
            <TextInput style={styles.inputField} placeholder='Release Year' onChangeText={year => setYear(year)} value={year} />
            <Button onPress={saveItem} title="Save" />
        </View>
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