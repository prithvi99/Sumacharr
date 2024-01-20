import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import HighlightedNews from '../../../components/HighlightedNews/HighlightedNews';
import colors from '../../../../theme/colors';
import navigateOnNewsPress from '../../../util/NavigateOnNewsPress/NavigateOnNewsPress';

//Declaring key for Async Storage (KEY - Value storage)
const KEY = '@bookmarkedNews';

export default function BookmarkNewsScreen() {
  //store bookmark data from async storage
  const [storageValue, setStorageValue] = useState([]);

  //Loading state to check if data has arrived from database
  const [loading, setLoading] = useState(false);

  //Global bookmark toggle to see if the state of bookmark has changed anywhere in the app
  const globalBookmarkToggle = useSelector(
    state => state.bookmark.isBookmarked,
  );

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  const navigation = useNavigation();

  //using useFocusEffect to gets items from async storage every time the bookmark screen is focused
  useFocusEffect(
    //using useCallback to run only when global bookmark toggle changes (i,e state of any bookmark changes)
    useCallback(() => {
      //fetching bookmarked values from async storage
      const getMyObject = async () => {
        setLoading(true);
        try {
          const keys = await AsyncStorage.getItem(KEY);
          const parsedKeys = JSON.parse(keys);
          setStorageValue(parsedKeys || []);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };

      getMyObject();
    }, [globalBookmarkToggle]),
  );

  //Reversing the storage value array to get the latest bookmark at the top
  const reversedStorageValue = storageValue.slice().reverse();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors[currentThemeColor].primary,
      }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          //   key={globalBookmarkToggle ? 'bookmarked' : 'not-bookmarked'}
          data={reversedStorageValue}
          keyExtractor={(item, index) => item.PK || item.Id || index.toString()}
          renderItem={({item}) => (
            // Pressable component to navigate to the detailed news screen on press
            <Pressable onPress={() => navigateOnNewsPress(item, navigation)}>
              <HighlightedNews item={item} bookmarkFlag={true} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

// UseEffect to clear all the bookmarks in the local storage

// useEffect(() => {
//   // getMyObject();
//   const clearAllItemsFromStorage = async () => {
//     try {
//       await AsyncStorage.removeItem(KEY);
//       console.log('All items removed from AsyncStorage');
//     } catch (error) {
//       console.error('Error clearing AsyncStorage:', error);
//     }
//   };

//   // Example usage:
//   clearAllItemsFromStorage();
// }, [globalBookmarked]);
