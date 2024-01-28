import {Pressable, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewsSlides from '../../NewsSlides/NewsSlides';
import HighlightedNews from '../../HighlightedNews/HighlightedNews';
import HorizontalNewsDispllay from '../../HorizontalNewsDisplay/HorizontalNewsDispllay';
import colors from '../../../../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {categoryQuery} from '../../../api/queries/categoryQuery';
import {useNavigation, useRoute} from '@react-navigation/native';
import CategoriesLoader from '../../ContentLoaders/CategoriesLoader/CategoriesLoader';
import Loader from '../../ContentLoaders/Loader/Loader';
import navigateOnNewsPress from '../../../util/NavigateOnNewsPress/NavigateOnNewsPress';
import {ReadNews} from '../../../util/ReadNewsItems/ReadNewsItems';
import {fetchNewsData} from '../../../../features/categorySlice/categorySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EXPIRY_TIME} from '../../../../assets/constants/Constants';
// import { RefreshControl } from 'react-native-gesture-handler';

const READ_KEY = '@hasReadNews';

const CategoriesComponent = ({categoryName}) => {
  const [data, setData] = useState(null);
  const [lastKey, setLastKey] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  const navigation = useNavigation();
  const routeName = useRoute();
  const currentScreen = routeName.name;

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
      const storageKeyName = `${categoryName}LastKey`;
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
          // Data is still valid.
          const {Items, LastEvaluatedKey} = await categoryQuery(
            categoryName,
            storedData.lastKey,
          );

          setData(Items);
          setLastKey(LastEvaluatedKey);
          setHasMoreData(!!LastEvaluatedKey);

          // Update the last key and expiration time
          const now = new Date();
          now.setMinutes(now.getMinutes() + 1); // Add 1 minutes to the current time
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
      const {Items, LastEvaluatedKey} = await categoryQuery(categoryName, null);

      setData(Items);
      setLastKey(LastEvaluatedKey);
      setHasMoreData(!!LastEvaluatedKey);

      // Store initial data with expiration time
      const now = new Date();
      now.setMinutes(now.getMinutes() + EXPIRY_TIME); // Add 3 hours to the current time
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

  const [readItemsIndices, setReadItemsIndices] = useState([]);

  const handleTwoFunctions = (item, index, navigation) => {
    navigateOnNewsPress(item, navigation);
    ReadNews(setReadItemsIndices, item, index);
  };

  const handleScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom && !loadingMore && hasMoreData) {
      fetchMoreData();
    }
  };

  const fetchMoreData = async () => {
    try {
      setLoadingMore(true);

      const {Items, LastEvaluatedKey} = await categoryQuery(
        categoryName,
        lastKey,
      );

      if (Items) {
        setData(prevData => (prevData ? [...prevData, ...Items] : Items));
        if (LastEvaluatedKey) {
          setLastKey(LastEvaluatedKey);
        } else {
          setHasMoreData(false);
          console.log('End of Data reached!');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  };

  const slidesData = data ? data.slice(0, 5) : [];
  const remainingData = data ? data.slice(5) : [];

  return (
    <ScrollView
      style={{backgroundColor: colors[currentThemeColor].primary}}
      onScroll={handleScroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      scrollEventThrottle={400}>
      {data ? (
        <>
          <NewsSlides data={slidesData} navigation={navigation} />
          {remainingData.map((item, index) => {
            const isItemRead = readItemsIndices.includes(index);

            if ((index + 1) % 3 === 0) {
              return (
                <Pressable
                  key={index}
                  onPress={() => handleTwoFunctions(item, index, navigation)}>
                  <HighlightedNews
                    item={item}
                    index={index}
                    isRead={isItemRead}
                  />
                </Pressable>
              );
            } else {
              return (
                <Pressable
                  key={index}
                  onPress={() => handleTwoFunctions(item, index, navigation)}>
                  <HorizontalNewsDispllay
                    item={item}
                    index={index}
                    isRead={isItemRead}
                  />
                </Pressable>
              );
            }
          })}
        </>
      ) : (
        <CategoriesLoader />
      )}
      {loadingMore && <Loader />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default CategoriesComponent;

// import {Pressable, ScrollView, StyleSheet} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import NewsSlides from '../../NewsSlides/NewsSlides';
// import HighlightedNews from '../../HighlightedNews/HighlightedNews';
// import HorizontalNewsDispllay from '../../HorizontalNewsDisplay/HorizontalNewsDispllay';
// import colors from '../../../../theme/colors';
// import {useDispatch, useSelector} from 'react-redux';
// import {categoryQuery} from '../../../api/queries/categoryQuery';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import CategoriesLoader from '../../ContentLoaders/CategoriesLoader/CategoriesLoader';
// import Loader from '../../ContentLoaders/Loader/Loader';
// import navigateOnNewsPress from '../../../util/NavigateOnNewsPress/NavigateOnNewsPress';
// import {ReadNews} from '../../../util/ReadNewsItems/ReadNewsItems';
// import CustomContentLoader from '../../ContentLoaders/CustomContentLoader/CustomContentLoader';
// import {fetchNewsData} from '../../../../features/categorySlice/categorySlice';

// const CategoriesComponent = ({categoryName}) => {
//   const [data, setData] = useState(null);
//   const [lastKey, setLastKey] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [hasMoreData, setHasMoreData] = useState(true);

//   const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

//   const navigation = useNavigation();
//   const routeName = useRoute();
//   const currentScreen = routeName.name;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // await new Promise(resolve => setTimeout(resolve, 2000));
//         const {Items, LastEvaluatedKey} = await categoryQuery(categoryName);
//         setData(Items);
//         setLastKey(LastEvaluatedKey);
//         setHasMoreData(!!LastEvaluatedKey);
//         // console.log('Last keys: ', LastEvaluatedKey);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [readItemsIndices, setReadItemsIndices] = useState([]);

//   const handleTwoFunctions = (item, index, navigation) => {
//     navigateOnNewsPress(item, navigation);
//     ReadNews(setReadItemsIndices, item, index);
//   };

//   const handleScroll = event => {
//     const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

//     const isCloseToBottom =
//       layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

//     if (isCloseToBottom && !loadingMore && hasMoreData) {
//       fetchMoreData();
//     }
//   };

//   const fetchMoreData = async () => {
//     try {
//       setLoadingMore(true);

//       const {Items, LastEvaluatedKey} = await categoryQuery(
//         categoryName,
//         lastKey,
//       );

//       if (Items) {
//         setData(prevData => (prevData ? [...prevData, ...Items] : Items));
//         if (LastEvaluatedKey) {
//           setLastKey(LastEvaluatedKey);
//         } else {
//           setHasMoreData(false);
//           console.log('End of Data reached!');
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingMore(false);
//     }
//   };

//   const slidesData = data ? data.slice(0, 5) : [];
//   const remainingData = data ? data.slice(5) : [];

//   return (
//     <ScrollView
//       style={{backgroundColor: colors[currentThemeColor].primary}}
//       onScroll={handleScroll}
//       scrollEventThrottle={400}>
//       {data ? (
//         <>
//           <NewsSlides data={slidesData} navigation={navigation} />
//           {remainingData.map((item, index) => {
//             const isItemRead = readItemsIndices.includes(index);

//             if ((index + 1) % 3 === 0) {
//               return (
//                 <Pressable
//                   key={index}
//                   onPress={() => handleTwoFunctions(item, index, navigation)}>
//                   <HighlightedNews
//                     item={item}
//                     index={index}
//                     isRead={isItemRead}
//                   />
//                 </Pressable>
//               );
//             } else {
//               return (
//                 <Pressable
//                   key={index}
//                   onPress={() => handleTwoFunctions(item, index, navigation)}>
//                   <HorizontalNewsDispllay
//                     item={item}
//                     index={index}
//                     isRead={isItemRead}
//                   />
//                 </Pressable>
//               );
//             }
//           })}
//         </>
//       ) : (
//         <CategoriesLoader />
//       )}
//       {loadingMore && <Loader />}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({});

// export default CategoriesComponent;

// const onRefresh = async () => {
//   setRefreshing(true);
//   {
//     refreshing && <CategoriesLoader />;
//   }
//   try {
//     await fetchData();
//   } finally {
//     setRefreshing(false);
//   }
// };

// useEffect(() => {
//   fetchData();
// }, []);

// const fetchData = async () => {
//   try {
//     const lastKeyCategory = await AsyncStorage.getItem(
//       `${categoryName}LastKey`,
//     );
//     console.log(`${categoryName}LastKey`, lastKeyCategory);

//     if (lastKeyCategory) {
//       const lastKey = JSON.parse(lastKeyCategory);

//       const {Items, LastEvaluatedKey} = await categoryQuery(
//         categoryName,
//         lastKey,
//       );

//       setData(Items);
//       setLastKey(LastEvaluatedKey);
//       setHasMoreData(!!LastEvaluatedKey);

//       await AsyncStorage.setItem(
//         `${categoryName}LastKey`,
//         JSON.stringify(LastEvaluatedKey),
//       );
//     } else {
//       // Handle the case when lastKey is not available
//       console.log('Last key not found');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const fetchData = async () => {
//   try {
//     const {Items, LastEvaluatedKey} = await categoryQuery(
//       categoryName,
//       lastKey,
//     );

//     setData(Items);
//     setLastKey(LastEvaluatedKey);
//     setHasMoreData(!!LastEvaluatedKey);

//     await AsyncStorage.setItem(
//       `${categoryName}LastKey`,
//       JSON.stringify(LastEvaluatedKey),
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
