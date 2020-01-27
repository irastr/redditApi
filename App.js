/**
 * @format
 * @flow
 */

import React from 'react';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Details: DetailsScreen,
    },
    {
      initialRouteName: 'Home',
    }
);

export default createAppContainer(AppNavigator);
