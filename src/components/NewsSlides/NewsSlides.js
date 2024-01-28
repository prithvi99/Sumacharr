import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import navigateOnNewsPress from '../../util/NavigateOnNewsPress/NavigateOnNewsPress';
import NewsSlidesHeadlineImages from '../NewsSlidesHeadlineImages/NewsSlideHeadlineImages';
import {SCREEN_WIDTH} from '../../../assets/constants/Constants';

const itemWidth = SCREEN_WIDTH * 0.85;

export default function NewsSlides({data, navigation}) {
  const flatListRef = useRef(null);

  const snapToInterval = itemWidth + 20;

  return (
    <View style={styles.newsSlideContainer}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({item, index}) => (
          <NewsSlidesHeadlineImages
            item={item}
            index={index}
            onPress={() => navigateOnNewsPress(item, navigation)}
          />
        )}
        horizontal
        snapToInterval={snapToInterval}
        decelerationRate="fast"
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  newsSlideContainer: {},
});
