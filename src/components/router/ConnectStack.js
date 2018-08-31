import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import transitionConfig from './config';
import Connect from '../connect/Connect';
import SingleUser from '../connect/SingleUser';
import SingleTrack from '../playlist/SingleTrack';

const ConnectStack = createStackNavigator({
  Connect: {
    screen: Connect,
    navigationOptions: {
      header: null,
    },
  },
  SingleUser: {
    screen: SingleUser,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.displayName,
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
  SingleTrack: {
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

ConnectStack.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    state: PropTypes.object,
  }),
};

export default ConnectStack;
