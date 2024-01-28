// import {Pressable, ScrollView, StyleSheet} from 'react-native';
// import React, {useCallback, useEffect, useState} from 'react';
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
// import {
//   fetchMoreNewsData,
//   fetchNewsData,
// } from '../../../../features/categorySlice/categorySlice';

// const World = ({categoryName = 'world'}) => {
//   // const [data, setData] = useState(null);
//   // const [lastKey, setLastKey] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [hasMoreData, setHasMoreData] = useState(true);

//   const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

//   const navigation = useNavigation();
//   const routeName = useRoute();
//   const currentScreen = routeName.name;

//   //Redux
//   const dispatch = useDispatch();
//   const worldData = useSelector(state => state.categoriesRequest.data);
//   const data = worldData.Items;
//   const lastKey = worldData.LastEvaluatedKey;

//   const status = useSelector(state => state.categoriesRequest.status);

//   useEffect(() => {
//     dispatch(fetchNewsData({categoryName}));
//     console.log('Status useeffect: ', status);
//   }, []);

//   console.log('World data: ', data?.length);
//   console.log('Last key: ', worldData);
//   console.log('Status: ', status);

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
//       // const {Items, LastEvaluatedKey} = await categoryQuery(
//       //   categoryName,
//       //   lastKey,
//       // );
//       dispatch(fetchNewsData({categoryName, lastKey}));

//       console.log('Last key fetch more: ', lastKey);

//       // if (Items) {
//       //   setData(prevData => (prevData ? [...prevData, ...Items] : Items));
//       //   if (LastEvaluatedKey) {
//       //     setLastKey(LastEvaluatedKey);
//       //   } else {
//       //     setHasMoreData(false);
//       //     console.log('End of Data reached!');
//       //   }
//       // }
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

// export default World;

import {View, Text} from 'react-native';
import React from 'react';
import CategoriesComponent from '../CategoriesComponent/CategoriesComponent';

const World = () => {
  return (
    <View>
      <CategoriesComponent categoryName={'world'} />
    </View>
  );
};

export default World;
