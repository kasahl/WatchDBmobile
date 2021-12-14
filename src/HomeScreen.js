import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList } from 'react-native';
import { getMetadata, push, ref, onValue, getDatabase, getStorage } from 'firebase/database';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function HomeScreen() {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDeDMA8a4xmgiED51iipi9BJm1dM-IK4aE",
    authDomain: "watchdb-a0222.firebaseapp.com",
    databaseURL: "https://watchdb-a0222-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "watchdb-a0222",
    storageBucket: "watchdb-a0222.appspot.com",
    messagingSenderId: "782456172187",
    appId: "1:782456172187:web:0b7eb98bae565330d7e03e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  ref(database, 'items/')
  
  const [ brand, setBrand ] = useState('');
  const [ model, setModel ] = useState('');
  const [ items, setItems ] = useState([]);

    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
        <StatusBar style='auto' />
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
