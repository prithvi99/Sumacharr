import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../theme/colors';
import {useSelector} from 'react-redux';

export default function TopBar({titleIndex, setIndex, routes}) {
  const flatListRef = useRef(null);

  const renderItem = ({item, index}) => {
    const onPress = () => {
      setIndex(index);
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
        <Text
          style={[
            titleIndex === index ? styles.activeItemText : styles.itemText,
            {color: currentThemeColor === 'light' ? '#222222' : '#e9e9e9'},
            // {color: colors[currentThemeColor].textColor},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  useEffect(() => {
    // Scroll to the selected index when titleIndex changes
    flatListRef.current.scrollToIndex({
      index: titleIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [titleIndex]);

  const getItemLayout = (_, index) => ({
    length: 90, // Adjust this value based on the item height in your design
    offset: 90 * index,
    index,
  });

  const refresh = () => {};

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors[currentThemeColor].primary},
      ]}>
      <View style={styles.topBarContainer}>
        <Image
          style={{height: 50, width: 50}}
          source={
            currentThemeColor === 'light'
              ? require('../../../assets/pictures/sumacharr_light_logo.png')
              : require('../../../assets/pictures/sumacharr_dark_logo.png')
          }
          // source={{
          //   uri:
          //     currentThemeColor === 'light'
          //       ? 'https://i.imgur.com/D3xn7Au.png'
          //       : 'https://i.imgur.com/mslxKra.png',
          // }}
        />
        <FlatList
          ref={flatListRef}
          data={routes}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.listContent}
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={getItemLayout}
        />
        <View style={{paddingRight: 10}}></View>

        {/* <Pressable onPress={refresh}>
          <AntDesign
            color={colors[currentThemeColor].textColor}
            style={styles.topBarIcons}
            name={'reload1'}
            size={25}
          />
        </Pressable> */}
      </View>
      <View
        style={[
          styles.line,
          {borderColor: colors[currentThemeColor].headlineColor},
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // paddingRight: 2,
  },
  topBarContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  topBarIcons: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  line: {
    borderBottomWidth: 0.2,
    backgroundColor: '#ccc',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  listContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center the content
  },
  itemContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 20,
    opacity: 0.8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 500,
  },
  activeItemText: {
    fontWeight: 800,
    fontSize: 18,
  },
});
