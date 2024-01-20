//Trending Screen component
import {FlatList, Pressable, RefreshControl, View} from 'react-native';
import colors from '../../../../theme/colors';
import {useSelector} from 'react-redux';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {categoryQuery} from '../../../api/queries/categoryQuery';
import TopStories from '../../../components/TopStories/TopStories';
import {useNavigation} from '@react-navigation/native';
import TopStoriesCustomLoader from '../../../components/ContentLoaders/TopStoriesCustomLoader/TopStoriesCustomLoader';
import navigateOnNewsPress from '../../../util/NavigateOnNewsPress/NavigateOnNewsPress';

export default function TrendingScreen() {
  const [data, setData] = useState(null); //To store and set data
  const [loadingMore, setLoadingMore] = useState(false); //Control loading more data
  const [lastKey, setLastKey] = useState(null); //To set and access AWS Dynamodb's Last evulated key for pagination
  const [hasMoreData, setHasMoreData] = useState(true); // use to keep check if API call has more data
  const [refreshing, setRefreshing] = useState(false); //use to control swipe down to refresh

  const navigation = useNavigation();

  //Query to fetch data
  const fetchData = useCallback(async () => {
    //Try to fetch data by calling category query and catch errors
    try {
      setRefreshing(true); //set loading to true while fetching data
      await new Promise(resolve => setTimeout(resolve, 2000));

      //passing categoryQuery ('trending') as paramater - awaiting to get data and last evulated key and storing them
      const {Items, LastEvaluatedKey} = await categoryQuery('trending');

      //setting the above received items respectivelly
      setData(Items);
      setLastKey(LastEvaluatedKey);
    } catch (error) {
      console.error(error);
    } finally {
      //set refreshing false after receiving the data
      setRefreshing(false);
    }
  }, []);

  //Query to fetch more data when user reached end of previous data
  const fetchMoreData = useCallback(async () => {
    try {
      if (!hasMoreData || loadingMore) {
        return;
      }

      setLoadingMore(true);

      //passing category and last evulated key from previous call, to receive more data
      const {Items, LastEvaluatedKey} = await categoryQuery(
        'trending',
        lastKey,
      );

      //If items are received above, merging them with the previous items and setting data with updated values
      if (Items) {
        setData(prevData => (prevData ? [...prevData, ...Items] : Items));

        // if - else block to see if more data exists
        if (LastEvaluatedKey) {
          setLastKey(LastEvaluatedKey);
        } else {
          setHasMoreData(false);
          console.log('End of Data reached!');
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  }, [lastKey, hasMoreData, loadingMore]); //calling fetchMoreData according to changes in the fowllowing

  //refresh to call data
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  //calling Topstories to render data
  const renderNewsItem = useCallback(
    ({item, index}) => (
      <Pressable onPress={() => navigateOnNewsPress(item, navigation)}>
        <TopStories item={item} index={index} />
      </Pressable>
    ),
    [navigation],
  );

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  //Limiting number of items to display
  const limitedData = useMemo(() => (data ? data.slice(0, 30) : []), [data]);

  //Fetching data
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setData(null);
        await fetchData();
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
  }, [fetchData]);

  return (
    <View style={{backgroundColor: colors[currentThemeColor].primary, flex: 1}}>
      {data ? (
        <FlatList
          onEndReached={fetchMoreData}
          data={limitedData}
          renderItem={renderNewsItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <TopStoriesCustomLoader />
      )}
      {refreshing && <TopStoriesCustomLoader />}
    </View>
  );
}
