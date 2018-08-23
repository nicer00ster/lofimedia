import React from 'react';
import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Profile from '../profile/Profile';

const UserStack = createStackNavigator({
  Profile: {
    screen: Profile
  },
}, {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: () => ({
      // title: 'Profile',
      // headerBackTitle: null,
      // headerStyle: {
      //   backgroundColor: '#1f222e',
      //   borderBottomWidth: 2,
      //   borderBottomColor: '#fff'
      // },
      // headerTitleStyle: {
      //   color: '#fff'
      // },
    }),
  });

export default UserStack;
