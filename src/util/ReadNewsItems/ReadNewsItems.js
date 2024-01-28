const {
  default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');

const READ_KEY = '@hasReadNews';
const TIME_STAMP_KEY = 'lastReadTimestamp';

const markItemAsRead = (setReadItemsIndices, index) => {
  setReadItemsIndices(prevIndices => [...prevIndices, index]);
};

export const ReadNews = async (setReadItemsIndices, item, index) => {
  try {
    const currentTime = new Date().getTime();
    const lastReadTimestamp = await AsyncStorage.getItem(TIME_STAMP_KEY);

    if (lastReadTimestamp) {
      const elapsedMinutes =
        (currentTime - parseInt(lastReadTimestamp)) / (1000 * 60);

      if (elapsedMinutes >= 30) {
        await AsyncStorage.removeItem(READ_KEY);
      }
    }

    await AsyncStorage.setItem(TIME_STAMP_KEY, currentTime.toString());

    const hasReadNews = await AsyncStorage.getItem(READ_KEY);

    if (hasReadNews) {
      const hasReadNewsArray = JSON.parse(hasReadNews);
      await AsyncStorage.setItem(
        READ_KEY,
        JSON.stringify([...hasReadNewsArray, item.PK]),
      );

      // console.log('read items: ', hasReadNewsArray);
      markItemAsRead(setReadItemsIndices, index);
    } else {
      await AsyncStorage.setItem(READ_KEY, JSON.stringify([item.PK]));
      markItemAsRead(setReadItemsIndices, index);
    }
  } catch (error) {
    console.log(error);
  }
};
