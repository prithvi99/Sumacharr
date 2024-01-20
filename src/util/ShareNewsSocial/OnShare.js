import {Share} from 'react-native';

export const onShare = async articleUrl => {
  //try to share news item and catch errors
  try {
    const result = await Share.share({
      //   title: data.Headline,
      //   message: data.Headline,
      url: articleUrl,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(
          `Shared successfully with activity type ${result.activityType}`,
        );
      } else {
        console.log('Shared successfully');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  } catch (error) {
    console.error('Error while sharing:', error.message);
  }
};
