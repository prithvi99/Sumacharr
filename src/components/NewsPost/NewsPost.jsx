import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../theme/colors';
import NewsImage from '../NewsPostComponents/NewsImage/NewsImage';
import NewsHeader from '../NewsPostComponents/NewsHeader/NewsHeader';
import NewsContent from '../NewsPostComponents/NewsContent/NewsContent';
import OtherSources from '../NewsPostComponents/OtherSources/OtherSources';
import SocialButtons from '../NewsPostComponents/SocialButtons/SocialButtons';
import {useRoute} from '@react-navigation/native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../assets/constants/Constants';
import Mockdata from '../../../assets/data.json';

const NewsPost = props => {
  const {post} = props;
  // const post = Mockdata;

  if (!post || !post.summary) {
    return null;
  }
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);
  const colorScheme = useColorScheme();

  const newsImgArray = post.NewsImg?.split(' ');
  const secondLink = newsImgArray ? newsImgArray[2] || newsImgArray[0] : '';

  const newsImageLink =
    secondLink && secondLink.startsWith('/')
      ? `https://news.google.com${secondLink}`
      : secondLink;

  const newsImgLargeArray = post.NewsSourceProfileImgLarge?.split(' ');
  const newsImgLargeLink = newsImgLargeArray
    ? newsImgLargeArray[2] || newsImgLargeArray[0]
    : post.NewsSourceProfileImg;

  return (
    <View style={styles.container}>
      {post.summary && (
        <>
          {post.NewsImg && <NewsImage secondLink={newsImageLink} />}
          <View
            style={[
              styles.bottomSection,
              {backgroundColor: colors[currentThemeColor].secondary},
            ]}>
            <View style={styles.articleButtons}>
              <NewsHeader
                profileImage={post.NewsSourceProfileImg}
                newsSource={post.NewsSource}
              />
              <SocialButtons data={post} />
            </View>
            <NewsContent data={post} />
            <OtherSources otherSources={post.Related} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
  },

  bottomSection: {
    padding: 10,
    height: '49%',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.4,
    position: 'relative',
    top: '-1%',
  },
  articleButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconText: {
    fontSize: 12,
  },
});

export default NewsPost;
