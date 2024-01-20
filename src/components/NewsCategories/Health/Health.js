import {View, Text} from 'react-native';
import React from 'react';
import CategoriesComponent from '../CategoriesComponent/CategoriesComponent';

const Health = () => {
  return (
    <View>
      <CategoriesComponent categoryName={'health'} />
    </View>
  );
};

export default Health;
