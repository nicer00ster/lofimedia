import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import Player from '../player/Player';
import Playlist from '../Playlist';
import Login from '../auth/Login';
import DrawerScreen from './DrawerScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Router = createDrawerNavigator({
  Media: {
    screen: Player,
    navigationOptions: {
      drawerLabel: 'MEDIA',
      drawerIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />
    }
  },
  Playlist: {
    screen: Playlist,
    navigationOptions: {
      drawerLabel: 'PLAYLIST',
      drawerIcon: ({ tintColor }) => <Icon name="favorite" size={25} color={tintColor} />,
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      drawerLabel: 'LOGIN',
      drawerIcon: ({ tintColor }) => <Icon name="favorite" size={25} color={tintColor} />,
    }
  }
}, {
  contentComponent: DrawerScreen,
  drawerWidth: 315,
  contentOptions: {
    activeTintColor: '#1f222e',
    inactiveTintColor: '#666',
    style: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    itemsContainerStyle: {
      flex: 1
    },
    labelStyle: {
      fontWeight: '600'
    }
  },
});

export default Router;
