import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import colors from '../../../theme/colors';
import TimeAgo from '../../util/TimeAgo/TimeAgo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

const KEY = '@hasReadNews';

const HorizontalNewsDispllay = ({item, index, isRead}) => {
  const newsImgArray = item.NewsImg?.split(' ');
  const secondLink = newsImgArray ? newsImgArray[2] : newsImgArray[0];

  const newsImageLink =
    secondLink && secondLink.startsWith('/')
      ? `https://news.google.com${secondLink}`
      : secondLink;

  const newsSrcProfleImgArr = item.NewsSourceProfileImg?.split(' ');
  const newsSrcProfleImgLink = newsSrcProfleImgArr
    ? newsSrcProfleImgArr[2] || newsSrcProfleImgArr[0]
    : placeholderUri;

  const placeholderUri =
    'https://th.bing.com/th/id/R.3e77a1db6bb25f0feb27c95e05a7bc57?rik=DswMYVRRQEHbjQ&riu=http%3a%2f%2fwww.coalitionrc.com%2fwp-content%2fuploads%2f2017%2f01%2fplaceholder.jpg&ehk=AbGRPPcgHhziWn1sygs8UIL6XIb1HLfHjgPyljdQrDY%3d&risl=&pid=ImgRaw&r=0';

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  const containerStyle = [
    styles.TSNContainer,
    {
      // shadowColor: colors[currentThemeColor].headlineColor,
      shadowColor: currentThemeColor === 'light' ? '#000' : '#999',
      backgroundColor: colors[currentThemeColor].secondary,
      borderBottomColor: currentThemeColor === 'light' ? '#ccc' : null,
    },
  ];

  // Add extra margin to the first item
  if (index === 0) {
    containerStyle.push(styles.firstItemMargin);
  }

  return (
    <View style={containerStyle}>
      <View style={styles.TSNImageContainer}>
        <FastImage
          style={styles.TSNImage}
          source={{uri: newsImageLink, priority: FastImage.priority.high}}
          // resizeMode={FastImage.resizeMode.contain}
        />
        {/* <Image style={styles.TSNImage} source={{uri: secondLink}} /> */}
      </View>
      <View style={styles.HNDContainer}>
        <View>
          <Text
            numberOfLines={3}
            style={[
              styles.TSNHeadline,
              {
                color: isRead
                  ? colors[currentThemeColor].readColor
                  : colors[currentThemeColor].headlineColor,
              },
            ]}>
            {item.Headline}
          </Text>
        </View>
        <View style={styles.HNDNewsInfoContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginRight: 10}}>
            <View style={styles.HNDProfileContainer}>
              {item.NewsSourceProfileImg && (
                <Image
                  style={[
                    styles.HNDProfilePicture,
                    // {
                    //   backgroundColor:
                    //     currentThemeColor === 'dark' ? '#fff' : '#fff',
                    // },
                  ]}
                  source={{
                    uri: newsSrcProfleImgLink,
                  }}
                />
              )}
              <ScrollView>
                <Text
                  style={{
                    color: isRead
                      ? colors[currentThemeColor].readColor
                      : colors[currentThemeColor].headlineColor,
                    fontSize: 14,
                  }}>
                  {item.NewsSource}
                </Text>
              </ScrollView>
            </View>
          </ScrollView>
          {!item.summary &&
            (item.ArticleLink.startsWith('https://www.youtube') ? (
              <View style={{margin: 5}}>
                <FontAwesome
                  color={
                    isRead
                      ? colors[currentThemeColor].readColor
                      : colors[currentThemeColor].paragraphColor
                  }
                  name={'youtube-play'}
                  size={20}
                />
              </View>
            ) : (
              <View style={{padding: 5}}>
                <Feather
                  color={
                    isRead
                      ? colors[currentThemeColor].readColor
                      : colors[currentThemeColor].paragraphColor
                  }
                  name={'external-link'}
                  size={20}
                />
              </View>
            ))}
          <View>
            <TimeAgo timestamp={item.Date} isRead={isRead} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HorizontalNewsDispllay;

const styles = StyleSheet.create({
  TSNContainer: {
    flexDirection: 'row',
    padding: 10,
    // borderBottomWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    // borderBottomColor: '#ccc',

    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  TSNImageContainer: {
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  TSNImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  TSNHeadline: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 2,
  },
  firstItemMargin: {
    marginTop: 10,
  },
  HNDContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  HNDProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HNDProfilePicture: {
    aspectRatio: 1,
    width: 28,
    height: 28,
    borderRadius: 5,
    // borderColor: 'grey',
    // borderWidth: 0.2,
    marginRight: 5,
  },
  HNDNewsInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

// if (newsLink.startsWith('/')) {
//     const secondLink = 'https://news.google.com' + newsLink;
//   } else {
//     const secondLink
//   }
