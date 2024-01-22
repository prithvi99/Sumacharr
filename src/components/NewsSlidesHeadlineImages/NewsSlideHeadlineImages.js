import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import TimeAgo from '../../util/TimeAgo/TimeAgo';
import colors from '../../../theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth * 0.85;

export default function NewsSlidesHeadlineImages({item, index, onPress}) {
  const newsImgArray = item.NewsImg?.split(' ');
  const secondLink = newsImgArray ? newsImgArray[2] : newsImgArray[0];

  const newsImageLink =
    secondLink && secondLink.startsWith('/')
      ? `https://news.google.com${secondLink}`
      : secondLink;

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={[
        styles.newsSlideImageContainer,
        {backgroundColor: colors[currentThemeColor].secondary},
      ]}>
      <FastImage
        source={{uri: newsImageLink, priority: FastImage.priority.high}}
        style={styles.newsSlideImage}
      />
      <LinearGradient
        start={{x: 0.5, y: 1}}
        end={{x: 0.5, y: 0}}
        colors={['rgba(0,0,0,.7)', 'transparent']}
        style={[styles.newsSlideImageGradient, {zIndex: 1}]}
      />
      <View style={styles.newsSlideContentContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.newsSlideProfileContainer}>
            <Image
              style={styles.newsSlideProfileImg}
              source={{uri: item.NewsSourceProfileImg}}
            />
            <Text style={{color: colors.primary}}>{item.NewsSource}</Text>
          </View>
          <View
            style={{
              padding: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {!item.summary &&
              (item.ArticleLink.startsWith('https://www.youtube') ? (
                <View style={{margin: 5}}>
                  <FontAwesome
                    color={colors.primary}
                    name={'youtube-play'}
                    size={20}
                  />
                </View>
              ) : (
                <View style={{padding: 5}}>
                  <Feather
                    color={colors.primary}
                    name={'external-link'}
                    size={20}
                  />
                </View>
              ))}
            <TimeAgo timestamp={item.Date} textColor={colors.primary} />
          </View>
        </View>
        <View
          style={[
            styles.newsSlideHeadlineContainer,
            {backgroundColor: colors[currentThemeColor].secondary},
          ]}>
          <Text
            numberOfLines={2}
            style={[
              styles.newsSlideHeadline,
              {color: colors[currentThemeColor].headlineColor},
            ]}>
            {item.Headline}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  newsSlideImageGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  headline: {
    fontSize: 24,
    fontWeight: 500,
    paddingLeft: 10,
    paddingTop: 5,
  },
  newsSlideImageContainer: {
    // padding: 10,
    margin: 10,
    position: 'relative',
    borderRadius: 10,
    // width: '100%',
    // height: '100%',
    height: screenHeight * 0.3,
    width: itemWidth,
    justifyContent: 'space-between',

    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  newsSlideImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  newsSlideContentContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
  newsSlideProfileContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  newsSlideProfileImg: {
    height: 30,
    width: 30,
    marginRight: 5,
    borderRadius: 5,
  },
  newsSlideHeadlineContainer: {
    padding: 10,
    borderRadius: 5,
  },
  newsSlideHeadline: {
    fontSize: 16,
    fontWeight: 500,
  },
  flatListContentContainer: {
    paddingHorizontal: (screenWidth - itemWidth) / 2,
  },
});
