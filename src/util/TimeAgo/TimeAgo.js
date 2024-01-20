import React from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import colors from '../../../theme/colors';
import {useSelector} from 'react-redux';

const TimeAgo = ({timestamp, textColor, isRead}) => {
  const timeAgo = moment(timestamp).fromNow();
  const currentThemeColor = useSelector(state => state.colorScheme.themeColor);

  return (
    <View>
      <Text
        style={{
          color: textColor
            ? textColor
            : isRead
            ? colors[currentThemeColor].readColor
            : colors[currentThemeColor].paragraphColor,
          fontSize: 13,
        }}>
        {timeAgo}
      </Text>
    </View>
  );
};

export default TimeAgo;
