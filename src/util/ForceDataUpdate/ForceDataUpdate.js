import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LAST_UPDATE_TIME,
  LATEST_SAVED_LAST_KEY,
} from '../../../assets/constants/Constants';

export const forceDataUpdate = async () => {
  try {
    const storedTime = await AsyncStorage.getItem(LAST_UPDATE_TIME);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    // console.log('current:', currentTimestamp);

    const now = new Date();
    now.setMinutes(now.getMinutes() + 2 * 60); // clear data in 6 hours
    const expiryTimeInTimestamp = Math.floor(now.getTime() / 1000);
    // console.log('Expiry: ', expiryTimeInTimestamp);

    if (storedTime) {
      const storedTimestamp = JSON.parse(storedTime);
      //   console.log('stored: ', storedTimestamp);

      if (currentTimestamp > storedTimestamp) {
        // Remove items from AsyncStorage
        await AsyncStorage.removeItem(LATEST_SAVED_LAST_KEY);
        await AsyncStorage.removeItem(LAST_UPDATE_TIME);

        // Optionally, you can log a message or perform other actions
        console.log('Items removed from AsyncStorage');
      }
    } else {
      // Set the value of current time + 6 hours in AsyncStorage
      await AsyncStorage.setItem(
        LAST_UPDATE_TIME,
        JSON.stringify(expiryTimeInTimestamp),
      );

      // Optionally, you can log a message or perform other actions
      console.log('New time value set in AsyncStorage');
    }
  } catch (error) {
    // Handle errors, such as AsyncStorage errors
    console.error('Error handling app open:', error);
  }
};
