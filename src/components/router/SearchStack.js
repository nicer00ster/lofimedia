import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Search from '../search/Search';
import SingleTrack from '../playlist/SingleTrack';
import transitionConfig from './config';

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      header: null,
    },
  },
  Single: {
    screen: SingleTrack,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerLeft: <Icon name="chevron-left" onPress={() => navigation.goBack()} size={35} color="white" />,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#1f222e',
        borderBottomWidth: 2,
        borderBottomColor: '#efefef',
      },
      headerTitleStyle: {
        color: '#efefef',
      },
    }),
  },
}, {
  mode: 'modal',
  transitionConfig,
});

SearchStack.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    state: PropTypes.object,
  }),
};

export default SearchStack;
