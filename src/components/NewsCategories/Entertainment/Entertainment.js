import {View, Text} from 'react-native';
import React from 'react';
import CategoriesComponent from '../CategoriesComponent/CategoriesComponent';

const Entertainment = () => {
  return (
    <View>
      <CategoriesComponent categoryName={'entertainment'} />
    </View>
  );
};

export default Entertainment;
