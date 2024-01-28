import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  IS_ON_BOARD_SHOWN,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../assets/constants/Constants';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    key: '1',
    image: require('../../../assets/pictures/onBoardingSlide1.jpg'),
  },
  {
    key: '2',
    image: require('../../../assets/pictures/onBoardingSlide2.jpg'),
  },
  {
    key: '3',
    image: require('../../../assets/pictures/onBoardingSlide3.jpg'),
  },
  {
    key: '4',
    image: require('../../../assets/pictures/onBoardingSlide4.jpg'),
  },
];

const OnBoardingSlides = () => {
  const navigation = useNavigation();

  const renderSlide = ({item}) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  const skipButton = () => (
    <TouchableOpacity onPress={() => userOnBoard()}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Skip</Text>
      </View>
    </TouchableOpacity>
  );

  const nextButton = () => (
    <View style={styles.button}>
      <Text style={styles.buttonText}>Next</Text>
    </View>
  );

  const doneButton = () => (
    <TouchableOpacity onPress={() => userOnBoard()}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Read News</Text>
      </View>
    </TouchableOpacity>
  );

  const userOnBoard = () => {
    AsyncStorage.setItem(IS_ON_BOARD_SHOWN, 'true');
    navigation.navigate('mainAppScreen');
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderSlide}
      keyExtractor={item => item.key}
      showSkipButton
      renderSkipButton={skipButton}
      renderNextButton={nextButton}
      renderDoneButton={doneButton}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  image: {
    height: '90%',
    width: '90%',
    resizeMode: 'contain',
    top: -60,
  },
  button: {
    backgroundColor: '#222222',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#e9e9e9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Inactive dot color
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#222222', // Active dot color
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default OnBoardingSlides;
