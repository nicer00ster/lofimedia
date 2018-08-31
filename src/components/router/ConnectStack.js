import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import transitionConfig from './config';
import Connect from '../connect/Connect';
import SingleUser from '../connect/SingleUser';

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

ConnectStack.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    state: PropTypes.object,
  }),
};

export default ConnectStack;
