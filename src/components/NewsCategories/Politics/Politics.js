import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

// import data from '../../../../dataJson/data.json';
import NewsSlides from '../../NewsSlides/NewsSlides';
import HighlightedNews from '../../HighlightedNews/HighlightedNews';
import HorizontalNewsDispllay from '../../HorizontalNewsDisplay/HorizontalNewsDispllay';
import {useDispatch, useSelector} from 'react-redux';
import {newsSummaryPage} from '../../../../features/newsSummary/newsSummarySlice';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../../theme/colors';
import {categoryQuery} from '../../../api/queries/categoryQuery';

export default function Politics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dynamoDBData = await categoryQuery('world', '2023-12-24');
        setData(dynamoDBData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const slidesData = data ? data.slice(0, 5) : [];
  const remainingData = data ? data.slice(5) : [];

  const navigation = useNavigation();

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);
  const dispatch = useDispatch();

  const handleNewsSummaryPage = () => {
    dispatch(newsSummaryPage({item, index}));
    navigation.navigate('NewsSummary');
  };

  return (
    <ScrollView style={{backgroundColor: colors[currentThemeColor].primary}}>
      <NewsSlides data={slidesData} />
      {remainingData.map((item, index) => {
        if ((index + 1) % 3 === 0) {
          return (
            <HighlightedNews
              item={item}
              index={index}
              key={index}
              onPress={() => handleNewsSummaryPage(item, index)}
            />
          );
        } else {
          return (
            <HorizontalNewsDispllay
              item={item}
              index={index}
              key={index}
              onPress={() => handleNewsSummaryPage(item, index)}
            />
          );
        }
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
