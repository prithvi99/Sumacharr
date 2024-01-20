import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../theme/colors';
import {useSelector} from 'react-redux';
import TimeAgo from '../../util/TimeAgo/TimeAgo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function HighlightedNews({item, index, isRead, bookmarkFlag}) {
  const [isBookmarked, setIsBookmarked] = useState(true);

  const newsImgArray = item.NewsImg?.split(' ');
  const secondLink = newsImgArray ? newsImgArray[2] : newsImgArray[0];
  const newsImageLink =
    secondLink && secondLink.startsWith('/')
      ? `https://news.google.com${secondLink}`
      : secondLink;

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  return (
    <View
      style={[
        styles.HighlightedNewsContainer,
        {backgroundColor: colors[currentThemeColor].secondary},
      ]}>
      {bookmarkFlag && (
        <Pressable
          style={{
            position: 'absolute',
            zIndex: 9,
            right: 10,
            top: 10,
            padding: 10,
          }}>
          <FontAwesome
            color={colors.primary}
            name={isBookmarked ? 'bookmark' : 'bookmark-o'}
            size={30}
          />
        </Pressable>
      )}
      <FastImage
        style={styles.HighlightedNewsImage}
        source={{uri: newsImageLink, priority: FastImage.priority.high}}
      />
      <View
        style={[
          styles.HighlightedNewsHeadlineContainer,
          {
            borderBottomColor: currentThemeColor === 'light' ? '#ccc' : null,
            borderBottomWidth: currentThemeColor === 'light' ? 1 : null,
          },
        ]}>
        <View style={styles.HNInfoContainer}>
          <View style={styles.HNImgContainer}>
            <Image
              style={styles.HNProfileImg}
              source={{uri: item.NewsSourceProfileImg}}
            />
            <Text
              style={{
                color: isRead
                  ? colors[currentThemeColor].readColor
                  : colors[currentThemeColor].headlineColor,
                fontSize: 14,
              }}>
              {item.NewsSource}
            </Text>
          </View>

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
                    color={
                      isRead
                        ? colors[currentThemeColor].readColor
                        : colors[currentThemeColor].headlineColor
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
                        : colors[currentThemeColor].headlineColor
                    }
                    name={'external-link'}
                    size={20}
                  />
                </View>
              ))}
            <TimeAgo timestamp={item.Date} isRead={isRead} />
          </View>
        </View>
        <Text
          numberOfLines={3}
          style={[
            styles.HighlightedNewsHeadline,
            {
              color: isRead
                ? colors[currentThemeColor].readColor
                : colors[currentThemeColor].headlineColor,
            },
          ]}>
          {' '}
          {item.Headline}{' '}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HighlightedNewsContainer: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,

    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  HighlightedNewsImage: {
    height: screenHeight * 0.27,
    width: '100%',
    borderRadius: 10,
    position: 'relative',
  },
  HighlightedNewsHeadlineContainer: {
    width: '100%',
    paddingBottom: 10,
  },
  HighlightedNewsHeadline: {
    fontSize: 18,
    fontWeight: 500,
    paddingTop: 5,
  },
  HNInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 5,
    marginTop: 5,
  },
  HNImgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 16,
  },

  HNProfileImg: {
    aspectRatio: 1,
    width: 28,
    height: 28,
    borderRadius: 5,
    marginRight: 5,
  },
});
