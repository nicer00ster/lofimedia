import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Profile from '../profile/Profile';
import SuperUser from '../profile/SuperUser';
import transitionConfig from './config';

const UserStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      header: null,
    }),
  },
  SuperUser: {
    screen: SuperUser,
    navigationOptions: ({ navigation }) => ({
      title: 'SUPERUSER',
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

export default UserStack;
