import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import TrendingScreen from '../Screens/TrendingScreen/TrendingScreen';
import {useSelector} from 'react-redux';
import colors from '../../../theme/colors';
import OpenLinkInBrowser from '../../components/OpenLinkInBrowser/OpenLinkInBrowser';
import CategoriesNewsPost from '../../components/CategoriesNewsPost/CategoriesNewsPost';

//Create Stack navigation using react navigation
const Stack = createStackNavigator();

// Custom header component for Top Stories
const CustomHeader = ({title}) => {
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  return (
    <View
      style={[
        {
          backgroundColor: colors[currentThemeColor].primary,
          borderBottomColor: colors.primary,
        },
        styles.customHeader,
      ]}>
      <Text
        style={[
          styles.title,
          {color: colors[currentThemeColor].headlineColor},
        ]}>
        Sumacharr
      </Text>
      <Text style={{color: '#DB2D43', fontWeight: '800', fontSize: 24}}>+</Text>
      <Text
        style={[
          styles.title,
          {color: colors[currentThemeColor].headlineColor},
        ]}>
        {' Top Stories'}
      </Text>
    </View>
  );
};

function TrendingNav() {
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors[currentThemeColor].primary,
        },
        headerTitleStyle: {
          display: 'none', // Hide default title
        },
        header: props => <CustomHeader {...props} />,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        gestureResponseDistance: 200,
      }}>
      {/* Trending Screen */}
      <Stack.Screen name="Trending" component={TrendingScreen} />

      {/* Categories News Post Screen */}
      <Stack.Screen
        name="CategoriesNewsPost"
        component={CategoriesNewsPost}
        options={{headerBackTitleVisible: false}}
      />

      {/* Browser screen */}
      <Stack.Screen
        name="InAppBrowser"
        component={OpenLinkInBrowser}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.2,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
  },
});

export default TrendingNav;
