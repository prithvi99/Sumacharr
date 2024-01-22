import {Pressable, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewsSlides from '../../NewsSlides/NewsSlides';
import HighlightedNews from '../../HighlightedNews/HighlightedNews';
import HorizontalNewsDispllay from '../../HorizontalNewsDisplay/HorizontalNewsDispllay';
import colors from '../../../../theme/colors';
import {useSelector} from 'react-redux';
import {categoryQuery} from '../../../api/queries/categoryQuery';
import {useNavigation, useRoute} from '@react-navigation/native';
import CategoriesLoader from '../../ContentLoaders/CategoriesLoader/CategoriesLoader';
import Loader from '../../ContentLoaders/Loader/Loader';
import navigateOnNewsPress from '../../../util/NavigateOnNewsPress/NavigateOnNewsPress';
import {ReadNews} from '../../../util/ReadNewsItems/ReadNewsItems';
import CustomContentLoader from '../../ContentLoaders/CustomContentLoader/CustomContentLoader';

const CategoriesComponent = ({categoryName}) => {
  const [data, setData] = useState(null);
  const [lastKey, setLastKey] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  const navigation = useNavigation();
  const routeName = useRoute();
  const currentScreen = routeName.name;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await new Promise(resolve => setTimeout(resolve, 2000));
        const {Items, LastEvaluatedKey} = await categoryQuery(categoryName);
        setData(Items);
        setLastKey(LastEvaluatedKey);
        setHasMoreData(!!LastEvaluatedKey);
        // console.log('Last keys: ', LastEvaluatedKey);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
