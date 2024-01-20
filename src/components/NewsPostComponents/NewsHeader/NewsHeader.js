import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../../theme/colors';

const NewsHeader = ({profileImage, newsSource}) => {
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  return (
    <View>
      <View style={styles.profileSection}>
        <Image style={styles.profilePicture} source={{uri: profileImage}} />
        <Text
          style={[
            {color: colors[currentThemeColor].headlineColor},
            styles.profileName,
          ]}>
          {newsSource}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    aspectRatio: 1,
    width: 40,
    borderRadius: 5,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 5,
  },
});

export default NewsHeader;
