import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../theme/colors';
import {useSelector} from 'react-redux';

export default function NoInternetComponent() {
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);
  return (
    <View
      style={{
        backgroundColor: colors[currentThemeColor].secondary,
        alignItems: 'center',
        justifyContent: 'center',
        top: '20%',
      }}>
      <Image
        style={{
          width: '98%',
          padding: 2,
          borderRadius: 10,
          borderWidth: 0.5,
        }}
        source={require('../../../assets/pictures/noInternetGif.gif')}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
