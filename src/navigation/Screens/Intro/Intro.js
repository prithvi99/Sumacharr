import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../assets/constants/Constants';

export default function Intro() {
  return (
    <View style={styles.introLogoContainer}>
      <Image
        style={styles.introLogo}
        source={
          require('../../../../assets/pictures/sumacharr.png')
          //   {
          //   uri: 'https://i.imgur.com/6ldhpgg.png', //Sumacharr image
          //   // uri: 'https://i.imgur.com/Ke05iFf.png', // Summize image
          // }
        }
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
    backgroundColor: '#e9e9e9',
  },
  introLogo: {
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.95,
    top: -SCREEN_HEIGHT * 0.15,
  },
});
