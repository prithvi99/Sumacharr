import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Intro() {
  return (
    <View style={styles.introLogoContainer}>
      <Image
        style={styles.introLogo}
        source={{
          uri: 'https://i.imgur.com/Ke05iFf.png',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  introLogoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  introLogo: {
    height: screenHeight * 0.2,
    width: screenWidth * 0.7,
  },
});
