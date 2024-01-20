import React, {useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import colors from '../../../../theme/colors';
import OpenLinkInBrowser from '../../OpenLinkInBrowser/OpenLinkInBrowser';
import TimeAgo from '../../../util/TimeAgo/TimeAgo';
import {useNavigation, useRoute} from '@react-navigation/native';
import SocialButtons from '../SocialButtons/SocialButtons';

const NewsContent = ({data}) => {
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);
  const navigation = useNavigation();
  const routeName = useRoute();
  const currentScreen = routeName.name;

  return (
    <>
      <Text
        numberOfLines={currentScreen === 'CategoriesNewsPost' ? 3 : 2}
        style={[
          styles.headline,
          {color: colors[currentThemeColor].headlineColor},
        ]}>
        {data.Headline}
      </Text>

      {/* Content */}
      <View style={styles.summaryContainer}>
        <ScrollView style={styles.summaryScrollView}>
          <Text
            style={[
              styles.content,
              {color: colors[currentThemeColor].paragraphColor},
            ]}>
            {data.summary}
          </Text>
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}>
        <Pressable
          style={styles.readMoreDiv}
          onPress={() =>
            navigation.navigate('InAppBrowser', {
              post: data,
            })
          }>
          <Text
            style={[
              styles.readMoreText,
              {color: colors[currentThemeColor].paragraphColor},
            ]}>
            Read more
          </Text>

          <FontAwesome
            name="chevron-right"
            size={12}
            style={{
              // alignSelf: 'center',
              color: colors[currentThemeColor].paragraphColor,
            }}
          />
        </Pressable>
        <View>
          <TimeAgo timestamp={data.Date} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headline: {
    paddingTop: 5,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 26,
  },
  content: {
    lineHeight: 24,
    fontSize: 16,
  },
  readMoreText: {
    fontSize: 18,
    fontWeight: '400',
    marginRight: 5,
  },
  readMoreDiv: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  summaryContainer: {
    height: '50%',
  },
  summaryScrollView: {
    flex: 1,
  },
});

export default NewsContent;
