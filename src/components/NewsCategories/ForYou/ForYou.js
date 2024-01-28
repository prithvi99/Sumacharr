import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {latestDataQuery} from '../../../api/queries/latestDataQuery';
import CustomContentLoader from '../../ContentLoaders/CustomContentLoader/CustomContentLoader';
import FlipCard from '../../FlipCard/FlipCard';
import useInternetStatus from '../../../hooks/useInternetStatus/useInternetStatus';
import NoInternetComponent from '../../NoInternetComponent/NoInternetComponent';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  EXPIRY_TIME,
  FLIP_CARD_EXPIRY,
  LATEST_SAVED_LAST_KEY,
} from '../../../../assets/constants/Constants';
import moment from 'moment';

export default function ForYou() {
  const [data, setData] = useState(null);
  const [lastKey, setLastKey] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const isConnectedToInternet = useInternetStatus();

  const updateStorageAndState = async (queryDate, lastKey, expiryTime) => {
    try {
      const {Items, LastEvaluatedKey} = await latestDataQuery(
        queryDate,
        lastKey,
      );
      // console.log('Query Parameters:', {currentDate, lastKey});
      setData(Items);
      setLastKey(LastEvaluatedKey);

      const newData = {lastKey: LastEvaluatedKey, expiryTime};
      await AsyncStorage.setItem(
        LATEST_SAVED_LAST_KEY,
        JSON.stringify(newData),
      );

      return {Items, LastEvaluatedKey};
    } catch (error) {
      console.log(error);
      return {Items: null, LastEvaluatedKey: null};
    }
  };

  const fetchData = async date => {
    try {
      setIsLoading(true);

      const storageKeyName = LATEST_SAVED_LAST_KEY;
      const savedData = await AsyncStorage.getItem(storageKeyName);
      // console.log('saved data: ', savedData);

      // Update the last key and expiration time
      const now = new Date();
      now.setMinutes(now.getMinutes() + EXPIRY_TIME); // Add 3 hours to the current time
      const expiryTimeInTimestamp = Math.floor(now.getTime() / 1000);

      // Check if there's any existing data
      if (savedData !== null) {
        const storedData = JSON.parse(savedData);
        const currentTimestamp = Math.floor(Date.now() / 1000);

        // Check if the stored data has expired
        if (currentTimestamp < storedData?.expiryTime) {
          // Data is still valid.
          const {Items, LastEvaluatedKey} = await updateStorageAndState(
            date,
            storedData.lastKey,
            expiryTimeInTimestamp,
          );

          // Set data and last key using the returned values
          setData(Items);
          setLastKey(LastEvaluatedKey);
        } else {
          // Remove expired data
          await AsyncStorage.removeItem(storageKeyName);

          // Fetch new data and set data and last key
          const {Items, LastEvaluatedKey} = await updateStorageAndState(
            date,
            null,
            expiryTimeInTimestamp,
          );

          // Set data and last key using the returned values
          setData(Items);
          setLastKey(LastEvaluatedKey);
        }
      } else {
        // If no existing data, fetch initial data
        const {Items, LastEvaluatedKey} = await updateStorageAndState(
          date,
          null,
          expiryTimeInTimestamp,
        );

        // Set data and last key using the returned values
        setData(Items);
        setLastKey(LastEvaluatedKey);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      timeZone: 'America/Toronto',
    });

    // Check if the date string is in the correct format (MM/DD/YYYY)
    const dateParts = currentDate.split('/');
    if (dateParts.length === 3) {
      const [month, day, year] = dateParts;

      // Create the formatted date string in 'yyyy-mm-dd' format
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0',
      )}`;
      console.log(formattedDate);

      setCurrentDate(formattedDate);
      fetchData(formattedDate);
      console.log('for you data ', data?.length);
    }
  }, [isConnectedToInternet]);

  return (
    <View>
      {isLoading ? (
        <CustomContentLoader />
      ) : isConnectedToInternet ? (
        data ? (
          <FlipCard posts={data} lastItemKey={lastKey} date={currentDate} />
        ) : (
          <CustomContentLoader />
        )
      ) : (
        <NoInternetComponent />
      )}
    </View>
  );
}
