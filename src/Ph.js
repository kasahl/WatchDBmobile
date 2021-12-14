import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

export default function Ph() {
    return (
      <View style={styles.container}>
        <Text>Placeholder</Text>
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
  