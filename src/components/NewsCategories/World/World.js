import {View, Text} from 'react-native';
import React from 'react';
import CategoriesComponent from '../CategoriesComponent/CategoriesComponent';

const World = () => {
  return (
    <View>
      <CategoriesComponent categoryName={'world'} />
    </View>
  );
};

export default World;
