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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EXPIRY_TIME} from '../../../../assets/constants/Constants';

export default function TrendingScreen() {
  const [data, setData] = useState(null); //To store and set data
  const [loadingMore, setLoadingMore] = useState(false); //Control loading more data
  const [lastKey, setLastKey] = useState(null); //To set and access AWS Dynamodb's Last evulated key for pagination
  const [hasMoreData, setHasMoreData] = useState(true); // use to keep check if API call has more data
  const [refreshing, setRefreshing] = useState(false); //use to control swipe down to refresh

  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storageKeyName = `trendingLastKey`;
      const savedData = await AsyncStorage.getItem(storageKeyName);

      // Check if there's any existing data
      if (savedData !== null) {
        const storedData = JSON.parse(savedData);
        const currentTimestamp = Math.floor(Date.now() / 1000);

        // Check if the stored data has expired
        if (currentTimestamp >= storedData?.expiryTime) {
          // Remove expired data
          await AsyncStorage.removeItem(storageKeyName);
        } else {
          // Data is still valid, you may use it if needed
          const {Items, LastEvaluatedKey} = await categoryQuery(
            'trending',
            storedData.lastKey,
          );

          setData(Items);
          setLastKey(LastEvaluatedKey);
          setHasMoreData(!!LastEvaluatedKey);

          // Update the last key and expiration time
          const now = new Date();
          now.setMinutes(now.getMinutes() + EXPIRY_TIME);
          const expiryTimeInTimestamp = Math.floor(now.getTime() / 1000);

          const newData = {
            lastKey: LastEvaluatedKey,
            expiryTime: expiryTimeInTimestamp,
          };

          await AsyncStorage.setItem(storageKeyName, JSON.stringify(newData));

          return; // Stop further execution as the data has been loaded
        }
      }

      // If execution reaches here, either there was no existing data or it was removed
      const {Items, LastEvaluatedKey} = await categoryQuery('trending', null);

      setData(Items);
      setLastKey(LastEvaluatedKey);
      setHasMoreData(!!LastEvaluatedKey);

      // Store initial data with expiration time
      const now = new Date();
      now.setMinutes(now.getMinutes() + 1); // Add 5 minutes to the current time
      const expiryTimeInTimestamp = Math.floor(now.getTime() / 1000);

      const newData = {
        lastKey: LastEvaluatedKey,
        expiryTime: expiryTimeInTimestamp,
      };

      await AsyncStorage.setItem(storageKeyName, JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  };

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

//  const onRefresh = useCallback(() => {
//    setRefreshing(true);
//    fetchData();
//  }, [fetchData]);

//  useEffect(() => {
//    const fetchDataAsync = async () => {
//      try {
//        setData(null);
//        await fetchData();
//      } catch (error) {
//        console.error(error);
//      }
//    };

//    fetchDataAsync();
//  }, [fetchData]);

//  //Query to fetch data
//  const fetchData = useCallback(async () => {
//    //Try to fetch data by calling category query and catch errors
//    try {
//      setRefreshing(true); //set loading to true while fetching data
//      // await new Promise(resolve => setTimeout(resolve, 2000));

//      //passing categoryQuery ('trending') as paramater - awaiting to get data and last evulated key and storing them
//      const {Items, LastEvaluatedKey} = await categoryQuery('trending');

//      //setting the above received items respectivelly
//      setData(Items);
//      setLastKey(LastEvaluatedKey);
//    } catch (error) {
//      console.error(error);
//    } finally {
//      //set refreshing false after receiving the data
//      setRefreshing(false);
//    }
//  }, []);
