import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const {addEventListener} = require('@react-native-community/netinfo');
const {useEffect, useState} = require('react');

const useInternetStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  const showToast = () => {
    Toast.show({
      type: 'yesInternet',
      text1: 'Connected to Internet!',
    });
  };
  const noInternet = () => {
    Toast.show(
      {
        type: 'noInternet',
        text1: 'No Internet connection!',
        props: {currentThemeColor},
      },
      5000,
    );
  };

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected === false) {
        noInternet();
      }
      //   state.isConnected && showToast();
    });
    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default useInternetStatus;
