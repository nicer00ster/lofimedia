import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import UserStack from './UserStack';
import SearchStack from './SearchStack';
import PlaylistStack from './PlaylistStack';
import ConnectStack from './ConnectStack';
import Player from '../player/Player';
import DrawerScreen from './DrawerScreen';

const RootStack = createBottomTabNavigator({
  Media: {
    screen: Player,
    navigationOptions: {
      tabBarLabel: 'MEDIA',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />,
    },
  },
  Playlist: {
    screen: PlaylistStack,
    navigationOptions: {
      mode: 'modal',
      tabBarLabel: 'PLAYLIST',
      tabBarIcon: ({ tintColor }) => <Icon name="playlist" type="simple-line-icon" size={25} color={tintColor} />,
    },
  },
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'SEARCH',
      tabBarIcon: ({ tintColor }) => <Icon name="search" size={25} color={tintColor} />,
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: 'rgba(255, 255, 255, 0.25)',
    labelStyle: {
      fontWeight: '600',
    },
    tabStyle: {
      backgroundColor: '#181a24',
    },
  },
});

const drawerConfig = {
  contentComponent: props => (
    <DrawerScreen {...props} />
  ),
  drawerWidth: 315,
  contentOptions: {
    activeTintColor: '#1f222e',
    inactiveTintColor: '#666',
    style: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    itemsContainerStyle: {
      flex: 1,
    },
    labelStyle: {
      fontWeight: '600',
    },
  },
};

const Navigator = createDrawerNavigator({
  Root: {
    screen: RootStack,
    navigationOptions: {
      drawerLabel: 'HOME',
      drawerIcon: ({ tintColor }) => <Icon type="font-awesome" name="home" color={tintColor} />,
    },
  },
  Profile: {
    screen: UserStack,
    navigationOptions: {
      drawerLabel: 'PROFILE',
      drawerIcon: ({ tintColor }) => <Icon type="font-awesome" name="user-circle" color={tintColor} />,
    },
  },
  Connect: {
    screen: ConnectStack,
    navigationOptions: {
      drawerLabel: 'CONNECT',
      drawerIcon: ({ tintColor }) => <Icon type="font-awesome" name="plug" color={tintColor} />,
    },
  },
}, drawerConfig);

export default Navigator;
