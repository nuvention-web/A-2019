import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import SingleItemScreen from '../screens/SingleItemScreen';

const SingleItemStack = createStackNavigator({
  SingleItem: SingleItemScreen,
});