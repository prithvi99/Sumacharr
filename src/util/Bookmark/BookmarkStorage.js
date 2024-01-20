//Bookmark Util functions

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

//Async storage key for Bookmarked items
const KEY = '@bookmarkedNews';

//Toast show on adding bookmark
const showToast = () => {
  Toast.show({
    type: 'bookmarkToast',
    text1: 'Bookmark Added!',
  });
};

//Remove bookmark function
export const removeNewsBookmark = async newsId => {
  // Try to fetch bookmarked items and handle errors
  try {
    //Tries to fetch bookmarked items
    const bookmarkedNews = await AsyncStorage.getItem(KEY);

    //if bookmarks exist, tries to find and match id of bookmark to remove
    if (bookmarkedNews) {
      const bookmarkedNewsArray = JSON.parse(bookmarkedNews);

      // Filter out the news with the specified id
      const newBookmarks = bookmarkedNewsArray.filter(
        e => e && e.PK !== newsId,
      );

      await AsyncStorage.setItem(KEY, JSON.stringify(newBookmarks));

      // console.log('Remove bookmark successful: ', newsId);
      // console.log('Remove array length: ', newBookmarks.length);
    } else {
      console.log('No bookmarks found.');
    }
  } catch (error) {
    console.log('Remove news error: ', error);
  }
};

//Save bookmark function
export const saveNewsBookmark = async data => {
  // Try to fetch bookmarked items and handle errors
  try {
    //Tries to fetch bookmarked items
    const bookmarkedNews = await AsyncStorage.getItem(KEY);

    //if they already exist, appends the newer item to the already existing items
    if (bookmarkedNews) {
      //parses and stores already existing items into an array
      const bookmarkedNewsArray = JSON.parse(bookmarkedNews);

      //adds the newer data to old data - stringyfying the newer array - storing it back in Async Storage
      await AsyncStorage.setItem(
        KEY,
        JSON.stringify([...bookmarkedNewsArray, data]),
      );
    } else {
      //if there no bookmarked items, adds the first item
      await AsyncStorage.setItem(KEY, JSON.stringify([data]));
    }
    //on  success gives toast (lol)
    showToast();
  } catch (error) {
    console.log(error);
  }
};
