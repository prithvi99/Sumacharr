import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {View, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../../theme/colors';

const screenHeight = Dimensions.get('window').height;

export default function CustomContentLoader() {
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  return (
    <View
      style={{
        backgroundColor: colors[currentThemeColor].primary,
        // backgroundColor: '#121212',
        top: 0,
      }}>
      <ContentLoader
        speed={2}
        width={'100%'}
        height={screenHeight} // Cover the whole screen height
        viewBox={`0 25 100 100`} // viewBox size adjusted for responsive layout
        backgroundColor={colors[currentThemeColor].loaderHome}
        foregroundColor="#ecebeb">
        {/* Photo */}
        <Rect x="2%" y="2" rx="5" ry="5" width="96%" height="30%" />

        {/* Headline - Line 1 */}
        <Rect x="2%" y="32%" rx="2" ry="2" width="96%" height="6" />

        {/* Headline - Line 2 */}
        <Rect x="2%" y="36%" rx="2" ry="2" width="90%" height="6" />

        <Rect x="2%" y="43%" rx="1" ry="1" width="96%" height="2%" />
        <Rect x="2%" y="46%" rx="1" ry="1" width="80%" height="2%" />
        <Rect x="2%" y="49%" rx="1" ry="1" width="96%" height="2%" />
        <Rect x="2%" y="52%" rx="1" ry="1" width="96%" height="2%" />
        <Rect x="2%" y="55%" rx="1" ry="1" width="80%" height="2%" />
        <Rect x="2%" y="58%" rx="1" ry="1" width="70%" height="2%" />
        <Rect x="2%" y="61%" rx="1" ry="1" width="96%" height="2%" />
        <Rect x="2%" y="64%" rx="1" ry="1" width="60%" height="2%" />
        <Rect x="2%" y="67%" rx="1" ry="1" width="96%" height="2%" />

        {/* <Rect x="5%" y="50%" rx="4" ry="4" width="90%" height="30%" /> */}
      </ContentLoader>
    </View>
  );
}
