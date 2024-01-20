const navigateOnNewsPress = (item, navigation) => {
  const newsImgLargeArray = item.NewsSourceProfileImgLarge?.split(' ');
  const newsImgLargeLink = newsImgLargeArray
    ? newsImgLargeArray[2] || newsImgLargeArray[0]
    : '';

  const newsImgNormalArray = item.NewsSourceProfileImg?.split(' ');
  const newsImgNormalLink = newsImgNormalArray
    ? newsImgNormalArray[2] || newsImgNormalArray[0]
    : '';

  if (item.summary) {
    navigation.navigate('CategoriesNewsPost', {post: item});
  } else {
    navigation.navigate('InAppBrowser', {
      url: item.ArticleLink,
      profileLarge: newsImgLargeLink,
      profileImg: newsImgNormalLink,
    });
  }
};

export default navigateOnNewsPress;

// const handleItemPress = (item, index) => {
//   const newsImgLargeArray = item.NewsSourceProfileImgLarge?.split(' ');
//   const newsImgLargeLink = newsImgLargeArray
//     ? newsImgLargeArray[2] || newsImgLargeArray[0]
//     : '';

//   const newsImgNormalArray = item.NewsSourceProfileImg?.split(' ');
//   const newsImgNormalLink = newsImgNormalArray
//     ? newsImgNormalArray[2] || newsImgNormalArray[0]
//     : '';
//   if (item.summary) {
//     navigation.navigate('CategoriesNewsPost', {post: item});
//   } else {
//     navigation.navigate('InAppBrowser', {
//       url: item.ArticleLink,
//       profileLarge: newsImgLargeLink,
//       profileImg: newsImgNormalLink,
//     });
//   }
// };
