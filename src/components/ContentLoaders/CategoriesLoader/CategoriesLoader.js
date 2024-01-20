import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {View, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../../theme/colors';

const screenHeight = Dimensions.get('window').height;

// export default function CategoriesLoader() {
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
//         <Rect x="2%" y="2" rx="5" ry="5" width="80%" height="30%" />
//         <Rect x="85%" y="2" rx="5" ry="5" width="20%" height="30%" />

//         {/* <Rect x="2%" y="32%" rx="2" ry="2" width="96%" height="6" />

//         <Rect x="2%" y="36%" rx="2" ry="2" width="90%" height="6" /> */}

//         <Rect x="2%" y={`33%`} rx="5" ry="5" width="25" height="25" />
//         <Rect x="30%" y="33%" rx="1" ry="1" width="60" height="2%" />
//         <Rect x="30%" y="36%" rx="1" ry="1" width="40" height="2%" />

//         <Rect x="2%" y={`47%`} rx="5" ry="5" width="25" height="25" />
//         <Rect x="30%" y="47%" rx="1" ry="1" width="60" height="2%" />
//         <Rect x="30%" y="50%" rx="1" ry="1" width="40" height="2%" />

//         {/* <Rect x="2%" y={`33%`} rx="5" ry="5" width="25" height="25" />
//         <Rect x="30%" y="33%" rx="1" ry="1" width="60" height="2%" />
//         <Rect x="30%" y="36%" rx="1" ry="1" width="40" height="2%" />

//         <Rect x="2%" y={`33%`} rx="5" ry="5" width="25" height="25" />
//         <Rect x="30%" y="33%" rx="1" ry="1" width="60" height="2%" />
//         <Rect x="30%" y="36%" rx="1" ry="1" width="40" height="2%" /> */}

//       </ContentLoader>
//     </View>
//   );
// }

// ... (other imports)

export default function CategoriesLoader() {
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
        <Rect x="2%" y="2" rx="5" ry="5" width="80%" height="30%" />
        <Rect x="85%" y="2" rx="5" ry="5" width="20%" height="30%" />

        <Rect x="2%" y={`33%`} rx="5" ry="5" width="25" height="25" />
        <Rect x="30%" y="33%" rx="1" ry="1" width="60" height="2%" />
        <Rect x="30%" y="36%" rx="1" ry="1" width="40" height="2%" />

        <Rect x="2%" y={`47%`} rx="5" ry="5" width="25" height="25" />
        <Rect x="30%" y="47%" rx="1" ry="1" width="60" height="2%" />
        <Rect x="30%" y="50%" rx="1" ry="1" width="40" height="2%" />

        <Rect x="2%" y={`61%`} rx="5" ry="5" width="25" height="25" />
        <Rect x="30%" y="61%" rx="1" ry="1" width="60" height="2%" />
        <Rect x="30%" y="64%" rx="1" ry="1" width="40" height="2%" />
      </ContentLoader>
    </View>
  );
}
