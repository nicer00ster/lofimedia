import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import UserStack from './UserStack';
import Player from '../player/Player';
import Profile from '../profile/Profile';
import Playlist from '../Playlist';
import Search from '../Search';
import DrawerScreen from './DrawerScreen';

const RootStack = createBottomTabNavigator({
  Media: {
    screen: Player,
    navigationOptions: {
      tabBarLabel: 'MEDIA',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />
    }
  },
  Playlist: {
    screen: Playlist,
    navigationOptions: {
      mode: 'modal',
      tabBarLabel: 'PLAYLIST',
      tabBarIcon: ({ tintColor }) => <Icon name="playlist-play" size={25} color={tintColor} />
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'SEARCH',
      tabBarIcon: ({ tintColor }) => <Icon name="search" size={25} color={tintColor} />
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#666',
    labelStyle: {
      fontWeight: '600',
    },
    tabStyle: {
      backgroundColor: '#181a24'
    },
  },
});

const drawerConfig = {
  contentComponent: (props, onRef) => (
    <DrawerScreen {...props} onRef={onRef} />
  ),
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
};

const Navigator = createDrawerNavigator({
  Root: {
    screen: RootStack,
    navigationOptions: {
      drawerLabel: 'ROOT',
      drawerIcon: ({ tintColor }) => <Icon type="font-awesome" name="home" color={tintColor} />
    },
  },
  Profile: {
    screen: UserStack,
    navigationOptions: {
      drawerLabel: 'PROFILE',
      drawerIcon: ({ tintColor }) => <Icon type="font-awesome" name="user-circle" color={tintColor} />
    }
  },
}, drawerConfig);

export default Navigator;
