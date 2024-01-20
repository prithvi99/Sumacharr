import {View, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrendingScreen from '../Screens/TrendingScreen/TrendingScreen';
import {useSelector} from 'react-redux';
import colors from '../../../theme/colors';
import CategoriesNewsPost from '../../components/CategoriesNewsPost/CategoriesNewsPost';
import OpenLinkInBrowser from '../../components/OpenLinkInBrowser/OpenLinkInBrowser';
import BookmarkNewsScreen from '../Screens/BookmarkNewsScreen/BookmarkNewsScreen';

const Stack = createNativeStackNavigator();

function BookmarkNav() {
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  //Custom header for Bookmark screen
  const CustomHeader = ({title}) => {
    return (
      <View
        style={[
          {
            backgroundColor: colors[currentThemeColor].primary,
            borderBottomColor: colors.primary,
          },
          styles.customHeader,
        ]}>
        <Text
          style={[
            styles.title,
            {color: colors[currentThemeColor].headlineColor},
          ]}>
          Bookmarked Stories
        </Text>
      </View>
    );
  };

  return (
    //Stack navigator for bookmark screen for users to navigate to CategoriesNewsPost page and OpenLinkInBrowser page
    <Stack.Navigator>
      {/* Bookmark Screen */}
      <Stack.Screen
        name="BookmarkStories"
        component={BookmarkNewsScreen}
        options={{
          headerStyle: {
            backgroundColor: colors[currentThemeColor].primary,
          },
          headerTitleStyle: {
            color: colors[currentThemeColor].headlineColor,
            fontWeight: '800',
            fontSize: 24,
          },
          header: props => <CustomHeader {...props} />,
        }}
      />
      {/* Categories News Post screen */}
      <Stack.Screen
        name="CategoriesNewsPost"
        component={CategoriesNewsPost}
        options={
          {
            // headerBackTitleVisible: false,
            // headerShown: false,
          }
        }
      />

      {/* Browser screen */}
      <Stack.Screen
        name="InAppBrowser"
        component={OpenLinkInBrowser}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default BookmarkNav;

const styles = StyleSheet.create({
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.2,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
  },
});
