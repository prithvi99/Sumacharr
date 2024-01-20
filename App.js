/*
 * App.js
 * Main entry point for the application.
 * Author: Prithvi Sisodia
 * Date: 19-01-2024
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainContainer from './src/navigation/Navigators/MainContainer';
import {useSelector} from 'react-redux';
import colors from './theme/colors';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/util/ToastConfig/ToastConfig';
import Intro from './src/navigation/Screens/Intro/Intro';
import CategoriesLoader from './src/components/ContentLoaders/CategoriesLoader/CategoriesLoader';

const App = () => {
  //State to control the Intro screen
  const [showIntro, setShowIntro] = useState(true);

  //Redux state to get the current theme color
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  //useEffect to control the display of the intro screen
  useEffect(() => {
    const introTimeout = setTimeout(() => {
      setShowIntro(false);
    }, 1000);

    return () => clearTimeout(introTimeout);
  }, []);

  //Renders the intro screen for 1 Second when the app;ication starts and then shows the MainContainer
  if (showIntro) {
    return <Intro />;
  }

  return (
    //Navigation container wrapping the main application
    <NavigationContainer>
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: colors[currentThemeColor].primary},
        ]}>
        {/* <CategoriesLoader /> */}
        <MainContainer />
        <Toast visibilityTime={6000} position="bottom" config={toastConfig} />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
