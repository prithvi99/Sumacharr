import React, {useState} from 'react';
import {Image, StyleSheet, Modal, Pressable, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const NewsImage = ({secondLink}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const images = [{url: secondLink}];

  return (
    secondLink && (
      <View style={{width: '100%', height: '32%'}}>
        <Pressable onPress={handleImagePress}>
          <Image style={styles.newsPostImage} source={{uri: secondLink}} />
        </Pressable>
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={handleModalClose}>
          <ImageViewer
            imageUrls={images}
            onClick={handleModalClose}
            onCancel={handleModalClose}
            enableSwipeDown={true}
          />
        </Modal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  newsPostImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
});

export default NewsImage;

// import React, {useState} from 'react';
// import {Image, View, StyleSheet, Pressable} from 'react-native';
// import ImgOverlay from '../../ImgOverlay/ImgOverlay';

// const NewsImage = ({secondLink}) => {
//   const [overlayVisible, setOverlayVisible] = useState(false);

//   const handleImagePress = () => {
//     // <ImgOverlay imgLink={secondLink} />;
//     setOverlayVisible(!overlayVisible);
//     console.log('second link : ', overlayVisible);
//   };

//   return (
//     secondLink && (
//       <View style={{width: '100%', height: '32%'}}>
//         <Pressable onPress={handleImagePress}>
//           <Image
//             style={styles.newsPostImage}
//             // resizeMode="cover"
//             source={{uri: secondLink}}
//           />
//         </Pressable>
//         {overlayVisible && <ImgOverlay />}
//       </View>
//     )
//   );
// };

// const styles = StyleSheet.create({
//   newsPostImage: {
//     width: '100%',
//     height: '100%',
//     // resizeMode: 'contain',
//     resizeMode: 'cover',
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//   },
//   // Other styles
// });

// export default NewsImage;

// import React from 'react';
// import {Image, View, StyleSheet} from 'react-native';

// const NewsImage = ({secondLink}) => {
//   return (
//     secondLink && (
//       <Image
//         style={styles.newsPostImage}
//         // resizeMode="cover"
//         source={{uri: secondLink}}
//       />
//     )
//   );
// };

// const styles = StyleSheet.create({
//   newsPostImage: {
//     width: '100%',
//     height: '40%',
//     resizeMode: 'contain',
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//   },
//   // Other styles
// });

// export default NewsImage;
