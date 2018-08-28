import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Playlist from '../playlist/Playlist';
import SingleTrack from '../SingleTrack';
import transitionConfig from './config';

const PlaylistStack = createStackNavigator({
  Playlist: {
    screen: Playlist,
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
        backgroundColor: 'rgba(31, 34, 46, 0.75)',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },
}, {
  mode: 'modal',
  transitionConfig,
});

PlaylistStack.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    state: PropTypes.object,
  }),
};

export default PlaylistStack;
