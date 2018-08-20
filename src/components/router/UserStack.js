import React from 'react';
import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Profile from '../profile/Profile';
import Search from '../Search';

const UserStack = createStackNavigator({
  Profile: {
    screen: Profile
  },
  Search: {
    screen: Search
  }
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
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  });

export default UserStack;
