import React, {useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../theme/colors';
import NewsImage from '../NewsPostComponents/NewsImage/NewsImage';
import NewsContent from '../NewsPostComponents/NewsContent/NewsContent';
import OtherSources from '../NewsPostComponents/OtherSources/OtherSources';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomNavigationHeader from '../CustomNavigationHeader/CustomNavigationHeader';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../assets/constants/Constants';

const CategoriesNewsPost = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {post} = route.params;

  useLayoutEffect(() => {
    if (post.ArticleLink) {
      navigation.setOptions({
        header: props => <CustomNavigationHeader {...props} />,
      });
    }
  }, [post.ArticleLink, navigation]);

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  const newsImgArray = post.NewsImg?.split(' ');
  const secondLink = newsImgArray ? newsImgArray[2] || newsImgArray[0] : '';

  const newsImageLink =
    secondLink && secondLink.startsWith('/')
      ? `https://news.google.com${secondLink}`
      : secondLink;

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
            <View style={styles.articleButtons}></View>
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
  profileLargeImage: {
    resizeMode: 'contain',
    height: 80,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    top: -15,
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 5,
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

export default CategoriesNewsPost;
