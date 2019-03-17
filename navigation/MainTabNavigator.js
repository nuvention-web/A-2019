import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import WardrobeScreen from '../screens/WardrobeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ?
          'ios-home'
          : 'md-home'
      }
    />
  ),
  tabBarOptions: { activeTintColor:'pink'},
};

const LinksStack = createStackNavigator({
  Wardrobe: WardrobeScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Wardrobe',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-shirt' : 'md-shirt'}
    />
  ),
  tabBarOptions: { activeTintColor:'pink'},
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
  tabBarOptions: { activeTintColor:'pink'},
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
