import React, { useState, useRef } from 'react';
import { View, TextInput, Alert, Image, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { Overlay } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { push, ref, getDatabase } from 'firebase/database';
import styles from './components/StyleComponent';
import FirebaseConfig from './components/FirebaseConfig';

import { initializeApp } from "firebase/app";

export default function Add() {

  const firebaseConfig = {FirebaseConfig};
    
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
    
  const keyboardVerticalOffset = Platform.OS === 'android' ? 100 : 0

  //Pushes currents states into database
  const saveItem = () => {
    if ( brand == 0 ){
      Alert.alert('Attention', 'Fill all input fields')
    }
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
  }

  //Asks for phone media library permission and activates pickImage function
  const askGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setGalleryPermission( status == 'granted' );
    try {
      pickImage();
    } catch (error) {
      console.error(error.message);
    }
  }

  //Async function for taking the picture with the camera and saving it as base64 encoded
  const takePicture = async () => {
    if (camera) {
      const picture = await camera.current.takePictureAsync({base64: true});
      setImageBase64(picture.base64);
      try {
        setCameraPermission(null)
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  //Async function for choosing an image from the phone's storage and saves it as base64 encoded
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: .5,
    });

    if (!result.cancelled) {
      setImageBase64(result.base64);
    }
  };

  return (
    <View>
      <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
        {/* View and Button for taking a picture with the camera */}
        <View style={{ backgroundColor: '#fff', height: '100%'}}>
          { cameraPermission ? 
            (
              <View style={{ alignItems: 'center', flexDirection: 'column-reverse'}}>
                <Camera style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} ref={camera} />
                <Overlay style={{ backgroundColor: 'transparent', paddingBottom: 150}}>
                  <Button onPress={takePicture} raised="true" buttonStyle={ styles.cameraButton } icon={<Ionicons name='camera-outline' color='green' size={24} />} />
                </Overlay>
              </View>
            ) : (
              <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} width='100%'>
                <View style={{ alignItems: 'center' }}>
                  <Image 
                    source={{uri: `data:image/gif;base64,${imageBase64}`}} 
                    style={ styles.imagePreview }
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button onPress={askCameraPermission} title="Open Camera" buttonStyle={ styles.buttons } icon={<Ionicons name='camera-outline' color='#fff' size={24} />}/>
                    <Button onPress={askGalleryPermission} title="Choose a Picture" buttonStyle={ styles.buttons } icon={<Ionicons name='albums-outline' color='#fff' size={24} />}/>
                  </View>
                  <View style={ styles.inputContainer }>
                    <TextInput style={styles.inputField} placeholder='Brand' onChangeText={brand => setBrand(brand)} value={brand} />
                    <TextInput style={styles.inputField} placeholder='Model' onChangeText={model => setModel(model)} value={model} />
                    <TextInput style={styles.inputField} placeholder='Dial Color' onChangeText={color => setColor(color)} value={color} />
                    <TextInput style={styles.inputField} placeholder='Case Material' onChangeText={material => setMaterial(material)} value={material} />
                    <TextInput style={styles.inputField} placeholder='Release Year' onChangeText={year => setYear(year)} value={year} />
                  </View>
                  <Button onPress={saveItem} title="Save" buttonStyle={ styles.buttons } icon={<Ionicons name='save-outline' color='#fff' size={24} />} />
                </View>
              </KeyboardAvoidingView>
            )}
        </View>
      </View>
    </View>
  );
}
