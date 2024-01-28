import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import SocialButtons from '../NewsPostComponents/SocialButtons/SocialButtons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../../theme/colors';
import {useSelector} from 'react-redux';
import {SCREEN_WIDTH} from '../../../assets/constants/Constants';

export default function CustomNavigationHeader({navigation, route}) {
  const {post, url, profileImg, screenName} = route.params;

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  const newsImgLargeArray = post?.NewsSourceProfileImgLarge?.split(' ');
  const newsImgLargeLink = newsImgLargeArray
    ? newsImgLargeArray[2] || newsImgLargeArray[0]
    : '';

  const newsImgNormalArray = post?.NewsSourceProfileImg?.split(' ');
  const newsImgNormalLink = newsImgNormalArray
    ? newsImgNormalArray[2] || newsImgNormalArray[0]
    : profileImg;

  return (
    <View
      style={[
        styles.CNHContainer,
        {
          backgroundColor: colors[currentThemeColor].primary,
          borderBottomColor: colors.primary,
        },
      ]}>
      <View style={{flex: 0.3}}>
        <Pressable style={{width: 25}} onPress={() => navigation.pop()}>
          <FontAwesome
            color={colors[currentThemeColor].headlineColor}
            name={'chevron-left'}
            size={25}
          />
        </Pressable>
      </View>

      <Image
        source={{
          uri: newsImgLargeLink ? newsImgLargeLink : newsImgNormalLink,
        }}
        style={[
          newsImgLargeLink
            ? {
                resizeMode: 'contain',
                height: 80,
                width: SCREEN_WIDTH * 0.18,
                alignSelf: 'center',
                justifyContent: 'center',
              }
            : {height: 30, width: 30, borderRadius: 5},
          styles.imageContainer, // Add a new style for centering the image
        ]}
      />

      <View style={{flex: 0.3, alignItems: 'flex-end'}}>
        {url && screenName?.name !== 'NewsTabs' ? null : (
          <SocialButtons data={post} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CNHContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 0.2,
  },
  imageContainer: {
    alignSelf: 'center',
  },
});
