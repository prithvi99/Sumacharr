import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {latestDataQuery} from '../../../api/queries/latestDataQuery';
import CustomContentLoader from '../../ContentLoaders/CustomContentLoader/CustomContentLoader';
import FlipCard from '../../FlipCard/FlipCard';

export default function ForYou() {
  //To store data and lastEvulatedItems received from fetching data
  const [data, setData] = useState(null);
  const [lastEvaluatedKey, setLastEvulatedKey] = useState(null);

  //fetching data according to latest date
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {Items, LastEvaluatedKey} = await latestDataQuery('2024-01-18');
        setLastEvulatedKey(LastEvaluatedKey);
        setData(Items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {/* Conditionally render the component if the data is received else show custom loader */}
      {data ? (
        <FlipCard posts={data} lastItemKey={lastEvaluatedKey} />
      ) : (
        <CustomContentLoader />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
