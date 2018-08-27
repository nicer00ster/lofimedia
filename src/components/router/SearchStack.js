import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Search from '../search/Search';
import SingleTrack from '../SingleTrack';
import { transitionConfig } from './config';

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      header: null
    },
  },
  Single: {
    screen: SingleTrack,
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
    transitionConfig
  });

export default SearchStack;
