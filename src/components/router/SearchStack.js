import React from 'react';
import { Animated, Easing, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
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
      headerLeft: <Icon name="chevron-left" onPress={() => navigation.goBack()} size={35} color="white" />,
      headerBackTitle: null,
      headerStyle: {
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
