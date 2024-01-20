import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {InfoToast} from 'react-native-toast-message';
import colors from '../../../theme/colors';
import {Text, View} from 'react-native';

export const toastConfig = {
  info: props => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: colors[currentThemeColor].primary,
        borderRadius: 60,
      }}
      contentContainerStyle={{
        paddingHorizontal: 5,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
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
