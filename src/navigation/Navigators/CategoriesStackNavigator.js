import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsTabs from '../Screens/NewsTabsScreen/NewsTabs';
import CategoriesNewsPost from '../../components/CategoriesNewsPost/CategoriesNewsPost';
import colors from '../../../theme/colors';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import OpenLinkInBrowser from '../../components/OpenLinkInBrowser/OpenLinkInBrowser';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const CategoriesStackNavigator = () => {
  //Get current theme color from Redux
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);
  const route = useRoute();
  const params = route.params;

  const focusedRoute = getFocusedRouteNameFromRoute(route);

  return (
    <Stack.Navigator
      initialRouteName="NewsTabs"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          // backgroundColor: colors[currentThemeColor].primary,
        },
        headerTintColor: currentThemeColor === 'light' ? '#000' : '#ffffff',
      }}>
      <Stack.Screen
        name="NewsTabs"
        component={NewsTabs}
        options={{headerShown: false, headerBackTitleVisible: false}}
      />
      <Stack.Screen name="CategoriesNewsPost" component={CategoriesNewsPost} />
      <Stack.Screen
        name="InAppBrowser"
        component={OpenLinkInBrowser}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoriesStackNavigator;
