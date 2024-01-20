// import React from 'react';
// import ContentLoader, {Rect} from 'react-content-loader/native';
// import {View, Dimensions} from 'react-native';
// import {useSelector} from 'react-redux';
// import colors from '../../../theme/colors';

// const screenHeight = Dimensions.get('window').height;

// const TopStoriesCustomLoader = () => {
//   const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

//   return (
//     <View
//       style={{
//         backgroundColor: colors[currentThemeColor].primary,
//         // backgroundColor: '#121212',
//         top: 0,
//       }}>
//       <ContentLoader
//         speed={2}
//         width={'100%'}
//         height={screenHeight} // Cover the whole screen height
//         viewBox={`0 25 100 100`} // viewBox size adjusted for responsive layout
//         backgroundColor={colors[currentThemeColor].loaderHome}
//         foregroundColor="#ecebeb">
//         {/* Photo */}

//         <Rect x="2%" y="1%" rx="1" ry="1" width="60%" height="2%" />
//         <Rect x="2%" y="4%" rx="1" ry="1" width="60%" height="2%" />
//         <Rect x="2%" y="7%" rx="1" ry="1" width="60%" height="2%" />
//         <Rect x="2%" y="10%" rx="1" ry="1" width="60%" height="2%" />
//         <Rect x="68" y="0" rx="5" ry="5" width="30" height="30" />

//         {/* <Rect x="5%" y="50%" rx="4" ry="4" width="90%" height="30%" /> */}
//       </ContentLoader>
//     </View>
//   );
// };

// export default TopStoriesCustomLoader;

import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {View, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../../theme/colors';

const screenHeight = Dimensions.get('window').height;

const TopStoriesCustomLoader = () => {
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  const generateRectangles = () => {
    const rectangles = [];

    for (let i = 0; i < 4; i++) {
      rectangles.push(
        <React.Fragment key={i}>
          {/* Lines */}
          {[...Array(4)].map((_, j) => (
            <Rect
              key={`${i}-${j}`}
              x="2%"
              y={`${1 + i * 20 + j * 3}%`}
              rx="1"
              ry="1"
              width="60%"
              height="2%"
            />
          ))}
          {/* Photo */}
          <Rect x="68%" y={`${i * 20}%`} rx="5" ry="5" width="30" height="30" />
        </React.Fragment>,
      );
    }

    return rectangles;
  };

  return (
    <View
      style={{
        backgroundColor: colors[currentThemeColor].primary,
        top: 0,
      }}>
      <ContentLoader
        speed={2}
        width={'100%'}
        height={screenHeight} // Cover the whole screen height
        viewBox={`0 25 100 100`} // viewBox size adjusted for responsive layout
        backgroundColor={colors[currentThemeColor].loaderHome}
        foregroundColor="#ecebeb">
        {generateRectangles()}
      </ContentLoader>
    </View>
  );
};

export default TopStoriesCustomLoader;
