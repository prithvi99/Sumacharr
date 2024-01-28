// /*
//  * App.js
//  * Main entry point for the application.
//  * Author: Prithvi Sisodia
//  * Date: 19-01-2024
//  */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainContainer from './src/navigation/Navigators/MainContainer';
import {useSelector} from 'react-redux';
import colors from './theme/colors';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/util/ToastConfig/ToastConfig';
import Intro from './src/navigation/Screens/Intro/Intro';
import OnBoardingSlides from './src/components/OnBoardingSlides/OnBoardingSlides';
import OnBoardingStackNavigator from './src/navigation/Navigators/OnBoardingStackNavigator';
import {
  IS_ON_BOARD_SHOWN,
  LAST_UPDATE_TIME,
  LATEST_SAVED_LAST_KEY,
} from './assets/constants/Constants';
import {forceDataUpdate} from './src/util/ForceDataUpdate/ForceDataUpdate';

const App = () => {
  // State to control the Intro screen
  const [showIntro, setShowIntro] = useState(true);
  // State to control the OnBoardingSlides
  const [showOnBoarding, setShowOnBoarding] = useState(false);

  // Redux state to get the current theme color
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  // useEffect to control the display of the intro screen and onboarding slides
  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        forceDataUpdate();
        // await AsyncStorage.removeItem(LATEST_SAVED_LAST_KEY);
        const onBoardingShown = await AsyncStorage.getItem(IS_ON_BOARD_SHOWN);
        if (onBoardingShown) {
          setShowOnBoarding(false);
        } else {
          // Intro hasn't been shown before, set showIntro to true
          setShowOnBoarding(true);
        }
      } catch (error) {
        console.error('Error checking intro status:', error);
      }
    };

    const introTimeout = setTimeout(() => {
      setShowIntro(false);
    }, 1000);

    checkIntroStatus();

    return () => clearTimeout(introTimeout);
  }, []);

  // Renders the intro screen for 1 Second when the application starts and then shows the OnBoardingSlides and MainContainer
  if (showIntro) {
    return <Intro />;
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors[currentThemeColor].primary,
    },
  };

  return (
    // Navigation container wrapping the main application
    <NavigationContainer theme={MyTheme}>
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: colors[currentThemeColor].primary},
        ]}>
        {/* <CategoriesLoader /> */}
        {/* <MainContainer /> */}
        {showOnBoarding ? <OnBoardingStackNavigator /> : <MainContainer />}

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
