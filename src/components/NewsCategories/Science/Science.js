import {View, Text} from 'react-native';
import React from 'react';
import CategoriesComponent from '../CategoriesComponent/CategoriesComponent';

const Science = () => {
  return (
    <View>
      <CategoriesComponent categoryName={'science'} />
    </View>
  );
};

export default Science;
