import {View, Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {categoryQuery} from '../api/queries/categoryQuery';
import NewsPost from '../NewsPost/NewsPost';
import {latestDataQuery} from '../../api/queries/latestDataQuery';

const screenHeight = Dimensions.get('window').height;

const FlipCard = ({posts, lastItemKey}) => {
  const [data, setData] = useState(posts);
  const [lastKey, setLastKey] = useState(lastItemKey);
  const [activeIndex, setActiveIndex] = useState();
  const [loadingMore, setLoadingMore] = useState(false);

  const isLastItem = index => index === data.length - 1;

  const handleSnapToItem = index => {
    setActiveIndex(index);
    if (isLastItem(index)) {
      fetchMoreItems();
    }
  };

  const fetchMoreItems = async () => {
    try {
      setLoadingMore(true);
      const {Items, LastEvaluatedKey} = await latestDataQuery(
        '2024-01-18',
        lastKey,
      );

      if (Items) {
        setData(prevData => (prevData ? [...prevData, ...Items] : Items));
        if (LastEvaluatedKey) {
          setLastKey(LastEvaluatedKey);
        } else {
          console.log('End of data reached!');
        }
      }
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.carousel}>
        <Carousel
          layout={'stack'}
          data={data}
          sliderHeight={300}
          itemHeight={screenHeight}
          vertical={true}
          renderItem={({item, index}) => <NewsPost post={item} index={index} />}
          onSnapToItem={handleSnapToItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  carousel: {
    height: screenHeight,
    backgroundColor: 'black',
  },
});

export default FlipCard;
