import React from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import colors from '../../../theme/colors';
import TimeAgo from '../../util/TimeAgo/TimeAgo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

const TopStories = ({item, index}) => {
  const newsImgArray = item.NewsImg?.split(' ');
  const secondLink = newsImgArray ? newsImgArray[2] : newsImgArray[0];

  const newsSrcProfleImgArr = item.NewsSourceProfileImg?.split(' ');
  const newsSrcProfleImgLink = newsSrcProfleImgArr
    ? newsSrcProfleImgArr[2]
    : newsSrcProfleImgArr[0];

  const newsImageLink =
    secondLink && secondLink.startsWith('/')
      ? `https://news.google.com${secondLink}`
      : secondLink;

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  const containerStyle = [
    styles.TopStoriesContainer,
    {
      backgroundColor: colors[currentThemeColor].secondary,
      borderBottomColor: currentThemeColor === 'light' ? '#ccc' : null,
    },
  ];

  // Add extra margin to the first item
  if (index === 0) {
    containerStyle.push(styles.firstItemMargin);
  }

  const placeholderUri =
    'https://th.bing.com/th/id/R.3e77a1db6bb25f0feb27c95e05a7bc57?rik=DswMYVRRQEHbjQ&riu=http%3a%2f%2fwww.coalitionrc.com%2fwp-content%2fuploads%2f2017%2f01%2fplaceholder.jpg&ehk=AbGRPPcgHhziWn1sygs8UIL6XIb1HLfHjgPyljdQrDY%3d&risl=&pid=ImgRaw&r=0';

  return (
    <View style={containerStyle}>
      <View style={styles.TopStoriesInfoContainer}>
        <View>
          <Text
            // numberOfLines={3}
            style={[
              styles.TopStoriesHeadline,
              {color: colors[currentThemeColor].headlineColor},
            ]}>
            {item.Headline}
          </Text>
        </View>
        <View style={styles.HNDNewsInfoContainer}>
          <ScrollView
            horizontal
            // showsHorizontalScrollIndicator={false}
            style={{marginRight: 10}}>
            <View style={styles.HNDProfileContainer}>
              {item.NewsSourceProfileImg && (
                <Image
                  style={[
                    styles.TopStoriesInfoProfilePicture,
                    // {
                    //   backgroundColor:
                    //     currentThemeColor === 'dark' ? '#fff' : '#fff',
                    // },
                  ]}
                  source={{
                    uri: newsSrcProfleImgLink,
                    // uri: item.NewsSourceProfileImg
                    //   ? item.NewsSourceProfileImg
                    //   : placeholderUri,
                  }}
                />
              )}

              <Text
                style={{
                  color: colors[currentThemeColor].headlineColor,
                  fontSize: 14,
                }}>
                {item.NewsSource}
              </Text>
            </View>
          </ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {!item.summary &&
              (item.ArticleLink.startsWith('https://www.youtube') ? (
                <View style={{margin: 5}}>
                  <FontAwesome
                    color={colors[currentThemeColor].paragraphColor}
                    name={'youtube-play'}
                    size={20}
                  />
                </View>
              ) : (
                <View style={{padding: 5}}>
                  <Feather
                    color={colors[currentThemeColor].paragraphColor}
                    name={'external-link'}
                    size={20}
                  />
                </View>
              ))}
            <TimeAgo timestamp={item.Date} />
          </View>
        </View>
      </View>
      <View style={styles.TopStoriesImageContainer}>
        <FastImage
          style={styles.TopStoriesImage}
          source={{uri: newsImageLink}}
        />
      </View>
    </View>
  );
};

export default TopStories;

const styles = StyleSheet.create({
  TopStoriesContainer: {
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
  TopStoriesImageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  TopStoriesImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  TopStoriesHeadline: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 2,
  },
  firstItemMargin: {
    marginTop: 10,
  },
  TopStoriesInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  HNDProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TopStoriesInfoProfilePicture: {
    aspectRatio: 1,
    width: 28,
    height: 28,
    borderRadius: 5,
    marginRight: 5,
  },
  HNDNewsInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
