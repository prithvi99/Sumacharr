import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../../theme/colors';
import {useNavigation} from '@react-navigation/native';

const OtherSources = ({otherSources}) => {
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);
  const navigation = useNavigation();

  return (
    <View style={styles.otherSourcesContainer}>
      {otherSources.length > 0 && (
        <View
          style={[
            {
              borderColor: colors[currentThemeColor].paragraphColor,
              backgroundColor: colors[currentThemeColor].secondary,
            },
            styles.backgroundContainer,
          ]}>
          <Text
            style={[
              {color: colors[currentThemeColor].headlineColor},
              styles.otherSourcesText,
            ]}>
            Related:
          </Text>
        </View>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {otherSources.map((item, index) => {
          const imgUrls = item.News_source_profile_img.split(' ');
          const imgUri = imgUrls[2];
          return (
            imgUri && (
              <TouchableWithoutFeedback
                key={index}
                onPress={() =>
                  navigation.navigate('InAppBrowser', {
                    url: item.Article_Link,
                    profileImg: imgUri,
                  })
                }>
                <View style={styles.sourceContainer}>
                  <Image
                    style={styles.otherSources}
                    resizeMode="cover"
                    source={{uri: imgUri}}
                  />
                  <Text
                    style={[
                      {color: colors[currentThemeColor].headlineColor},
                      styles.sourceName,
                    ]}>
                    {item.News_Source}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  otherSourcesContainer: {
    flexDirection: 'row',
    marginTop: 10,
    position: 'absolute',
    bottom: 20,
    left: 10,
    alignItems: 'center',
  },
  backgroundContainer: {
    borderWidth: 0.5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    zIndex: 1,

    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  sourceContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  otherSources: {
    aspectRatio: 1,
    width: 28,
    height: 28,
    borderRadius: 5,
  },
  sourceName: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: '400',
  },
  otherSourcesText: {
    fontWeight: '400',
    fontSize: 14,
  },
});

export default OtherSources;
