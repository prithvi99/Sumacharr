import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {InfoToast, SuccessToast} from 'react-native-toast-message';
import colors from '../../../theme/colors';
import {Text, View, useColorScheme} from 'react-native';

export const toastConfig = {
  yesInternet: ({text1, props}) => (
    <View
      style={{
        height: 40,
        width: '100%',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 14, fontWeight: 400, color: '#fff'}}>
        {text1}
      </Text>
    </View>
  ),
  noInternet: ({text1, props}) => (
    <View
      style={{
        height: 50,
        width: '80%',
        backgroundColor: colors[props.currentThemeColor].toastBg,
        borderRadius: 10,
        alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
      }}>
      <View style={{paddingRight: 10}}>
        <MaterialIcons
          name={'info-outline'}
          size={25}
          color={colors[props.currentThemeColor].primary}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 400,
          color: colors[props.currentThemeColor].primary,
        }}>
        {text1}
      </Text>
    </View>
  ),
  bookmarkToast: ({text1, props}) => (
    <View
      style={{
        height: 60,
        width: '80%',
        backgroundColor: colors.primary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Text style={{fontSize: 14, fontWeight: 400, color: '#121212'}}>
        {text1}
      </Text>
      <View>
        <MaterialIcons name={'bookmark'} size={25} color={'#121212'} />
      </View>
    </View>
  ),
};
