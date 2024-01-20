import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setBookmark} from '../../../../features/bookmarkSlice/bookmarkSlice';
import {
  loadBookmarkStatus,
  removeNewsBookmark,
  saveNewsBookmark,
} from '../../../util/Bookmark/BookmarkStorage';
import {onShare} from '../../../util/ShareNewsSocial/OnShare';

const KEY = '@bookmarkedNews';

const SocialButtons = ({data}) => {
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);
  const dispatch = useDispatch();

  //Getting the best possible image link from the data
  const newsImgArray = data.NewsImg?.split(' ');
  const secondLink = newsImgArray ? newsImgArray[2] : newsImgArray[0];

  //local state of bookmark on each post
  const [isBookmarked, setIsBookmarked] = useState(false);

  //loading bookmaark status of each post
  useEffect(() => {
    const loadBookmarkStatus = async () => {
      try {
        //tries to fetch bookmark news from async storage if they exist
        const bookmarkedNews = await AsyncStorage.getItem(KEY);
        //parsing (converting it to js array) and storing it bookmarkedNewsArray
        if (bookmarkedNews) {
          const bookmarkedNewsArray = JSON.parse(bookmarkedNews);

          //sets the status of the bookmark
          if (data) {
            //checks the data from Async Storage (bookmarkedNewsArray) to see if the current post is bookmarked
            const isPostBookmarked = bookmarkedNewsArray.some(
              e => e && e.PK === data.PK,
            );
            //sets the correct state of bookmark
            setIsBookmarked(isPostBookmarked);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadBookmarkStatus(data);
  }, [data]); //calls for every news post

  //toggles the bookmark button and changes accordingly
  const toggleIsBookmarked = data => {
    //changes global bookmark toggle, to change the global bookmark toggle
    //BookmarkNewsScreen makes changes if bookmark state is toggled anywhere in the app
    dispatch(setBookmark());

    //sets the bookmark state
    const updatedIsBookmarked = !isBookmarked;
    setIsBookmarked(updatedIsBookmarked);

    //calls the appropriate function based on the toggle
    if (updatedIsBookmarked) {
      saveNewsBookmark(data);
    } else if (data) {
      removeNewsBookmark(data.PK);
    }
  };

  return (
    <View style={styles.socialButtons}>
      <Pressable onPress={() => onShare(data.ArticleLink)} style={styles.icons}>
        <Feather
          color={colors[currentThemeColor].headlineColor}
          name="share"
          size={25}
        />
      </Pressable>

      <Pressable onPress={() => toggleIsBookmarked(data)} style={styles.icons}>
        <FontAwesome
          color={colors[currentThemeColor].headlineColor}
          name={isBookmarked ? 'bookmark' : 'bookmark-o'}
          size={25}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  socialButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 0.5,
  },
  icons: {
    color: 'black',
    alignItems: 'center',
    padding: 7,
  },
});

export default SocialButtons;
