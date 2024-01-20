import {View, Text} from 'react-native';
import React from 'react';
import CategoriesComponent from '../CategoriesComponent/CategoriesComponent';

const Technology = () => {
  return (
    <View>
      <CategoriesComponent categoryName={'technology'} />
    </View>
  );
};

export default Technology;
