import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#DB2D43" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // display: 'flex',
    top: 0,
    height: screenHeight,
  },
});
