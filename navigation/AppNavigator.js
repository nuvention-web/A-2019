import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LandingScreen from '../screens/LandingScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PickBasicItemsScreen from '../screens/PickBasicItemsScreen';

const Main = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Landing: LandingScreen,
  LogIn: LogInScreen,
  SignUp: SignUpScreen,
  PickBasicItems: PickBasicItemsScreen,
},{
	initialRouteName: 'Landing'
})
// const SingleItemStack = createStackNavigator({
//   SingleItem: SingleItemScreen,
//   Main: Main,
  
// },{
// 	initialRouteName: 'Main'
// });

export default createAppContainer(Main);