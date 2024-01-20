import {View, Text} from 'react-native';
import React from 'react';
import CategoriesComponent from '../CategoriesComponent/CategoriesComponent';

const Sports = () => {
  return (
    <View>
      <CategoriesComponent categoryName={'sports'} />
    </View>
  );
};

export default Sports;
