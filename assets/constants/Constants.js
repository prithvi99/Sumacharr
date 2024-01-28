import {Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

//Expoiry times
export const EXPIRY_TIME = 3 * 60;

//Async Storage Keys

//OnBoard Key
export const IS_ON_BOARD_SHOWN = '@onBoardingShown';

//Get latest data last key
export const LATEST_SAVED_LAST_KEY = '@latestLastKey';

//last time the last key was cleared from the system to get the latest data
export const LAST_UPDATE_TIME = '@lastUpdateTime';
