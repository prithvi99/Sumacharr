import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomNavigationHeader from '../CustomNavigationHeader/CustomNavigationHeader';
import Loader from '../ContentLoaders/Loader/Loader';

const OpenLinkInBrowser = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {post, url} = route.params;
  const webViewRef = useRef(null);

  const postLink = post ? (post.ArticleLink ? post.ArticleLink : url) : url;

  const handleShouldStartLoadWithRequest = event => {
    const allowedDomains = [postLink, 'm.youtube.com'];

    const isAllowedDomain = allowedDomains.some(domain =>
      event.url.includes(domain),
    );
    const isPopup =
      event.url.includes('popup=1') || event.url.includes('target=_blank');

    if (isAllowedDomain && !isPopup) {
      return true;
    } else {
      return false;
    }
  };

  useLayoutEffect(() => {
    if (postLink) {
      navigation.setOptions({
        header: props => <CustomNavigationHeader {...props} />,
      });
    }
  }, [postLink, navigation]);

  const renderLoading = () => <Loader />;

  webViewRef.current?.injectJavaScript(`
    window.location.href = 'https://m.youtube.com/?persist_app=1&app=m';
  `);

  return (
    <View style={styles.browserContainer}>
      <WebView
        ref={webViewRef}
        source={{uri: postLink}}
        incognito={true}
        cacheEnabled={false}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        mediaPlaybackRequiresUserAction={true}
        renderLoading={renderLoading}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
        // onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="compatibility" // Needed for loading HTTP content in HTTPS sites
        useWebKit={true} // Use WKWebView on iOS for additional features
        allowsInlineMediaPlayback={false} // Prevent autoplay of videos
        automaticallyAdjustContentInsets={false}
        scalesPageToFit={true}
      />
    </View>
  );
};

export default OpenLinkInBrowser;

const styles = StyleSheet.create({
  browserContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
