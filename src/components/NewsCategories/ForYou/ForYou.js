import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {latestDataQuery} from '../../../api/queries/latestDataQuery';
import CustomContentLoader from '../../ContentLoaders/CustomContentLoader/CustomContentLoader';
import FlipCard from '../../FlipCard/FlipCard';
import useInternetStatus from '../../../hooks/useInternetStatus/useInternetStatus';
import NoInternetComponent from '../../NoInternetComponent/NoInternetComponent';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

export default function ForYou() {
  //To store data and lastEvulatedItems received from fetching data
  const [data, setData] = useState(null);
  const [lastEvaluatedKey, setLastEvulatedKey] = useState(null);

  const isConnectedToInternet = useInternetStatus();
  //fetching data according to latest date
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {Items, LastEvaluatedKey} = await latestDataQuery('2024-01-21');
        setLastEvulatedKey(LastEvaluatedKey);
        setData(Items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isConnectedToInternet]);

  const showToast = () => {
    Toast.show({
      type: 'noInternet',
      text1: 'Connected to Internet!',
    });
  };

  return (
    <View>
      {/* Conditionally render the component if the data is received else show custom loader */}
      {isConnectedToInternet ? (
        data ? (
          <FlipCard posts={data} lastItemKey={lastEvaluatedKey} />
        ) : (
          <CustomContentLoader />
        )
      ) : (
        <NoInternetComponent />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
