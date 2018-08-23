import React from 'react';
import { Animated, Easing, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Search from '../search/Search';
import SearchSelect from '../search/SearchSelect';
import Player from '../player/Player';

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      header: null
    },
  },
  Selected: {
    screen: SearchSelect,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerBackTitle: null,
      headerStyle: {
        fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'Courier New',
        backgroundColor: 'rgba(31, 34, 46, 0.75)',
        borderBottomWidth: 2,
        borderBottomColor: '#fff'
      },
      headerTitleStyle: {
        color: '#fff'
      },
    }),
  }
}, {
    mode: 'modal',
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
          outputRange: [height, 0, 200],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  });

export default SearchStack;