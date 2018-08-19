import React from 'react';
import { StatusBar, Platform, Easing, Animated } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { FBLoginManager } from 'react-native-facebook-login';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import { fetchMusic, fetchDaily, fetchUser, onfbLogin, onfbLogout, updateUserInfo } from '../../actions';
// import { getUser } from '../auth/index';
import { checkCredentials } from '../auth/index';
// import rootSaga from '../sagas/index';

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

const AuthStack = createStackNavigator({
  Profile: {
    screen: Profile
  }
}, {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: true,
    },
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
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
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

const Router = createDrawerNavigator({
  Root: {
    screen: RootStack,
    navigationOptions: {
      drawerLabel: 'ROOT',
      drawerIcon: ({ tintColor }) => <Icon type="font-awesome" name="home" color={tintColor} />
    },
  },
  Profile: {
    screen: AuthStack,
    navigationOptions: {
      drawerLabel: 'PROFILE',
      drawerIcon: ({ tintColor }) => <Icon type="font-awesome" name="user-circle" color={tintColor} />
    }
  }
}, drawerConfig);

class Root extends React.Component {
 componentDidMount() {
    checkCredentials(this.props.updateUserInfo);
    this.props.fetchMusic();
    this.props.fetchDaily();
  };

  render() {
    return (
        <Router {...this.props} screenProps={this.props} />
    );
  }
}

const mapStateToProps = ({ tracks, daily, user }) => ({
  tracks: tracks.tracks,
  user: user,
  daily: daily.daily.dailyMessage,
});

const mapDispatchToProps = { fetchMusic, fetchDaily, onfbLogin, onfbLogout, updateUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(Root);
