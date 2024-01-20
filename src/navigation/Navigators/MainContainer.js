import {StyleSheet, useColorScheme} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TrendingNav from './TrendingNav';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setThemeMode} from '../../../features/colorScheme/colorSchemeSlice';
import colors from '../../../theme/colors';
import CategoriesStackNavigator from './CategoriesStackNavigator';
import BookmarkNav from './BookmarkNav';

//Create a bottom Tab navigator using react navigation
const Tab = createBottomTabNavigator();

export default function MainContainer() {
  //Retrive the current theme color from the Redux state
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);
  dispatch = useDispatch();

  //Retrive color scheme used by the device
  const colorScheme = useColorScheme();

  //using useEffect to dispatch any changes in color scheme of the device
  useEffect(() => {
    dispatch(setThemeMode(colorScheme));
  }, [colorScheme]);

  return (
    //Bottom Tab Navigator with specified screens
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:
          currentThemeColor === 'light' ? '#000' : '#ffffff',
        headerShadowVisible: true,
        tabBarStyle: {
          backgroundColor: colors[currentThemeColor].primary,
          borderTopColor: '#ffffff',
          borderTopWidth: 0.2,
        },
      }}>
      {/* Home Screen */}
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons
              focused={focused}
              color={color}
              name={'home'}
              size={30}
            />
          ),
        }}
        component={CategoriesStackNavigator}
      />
      {/* Trending Screen */}
      <Tab.Screen
        name="TrendingNav"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons
              focused={focused}
              color={color}
              name={'trending-up'}
              size={30}
            />
          ),
        }}
        component={TrendingNav}
      />
      {/* Bookmark Screen */}
      <Tab.Screen
        name="BookmarkNav"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons
              focused={focused}
              color={color}
              name={'bookmark'}
              size={30}
            />
          ),
        }}
        component={BookmarkNav}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
