import React from 'react';
import { StatusBar, Platform, Animated, Easing } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { FBLoginManager } from 'react-native-facebook-login';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { fetchMusic, fetchDaily, fetchUser } from '../../actions';

import Player from '../player/Player';
import Playlist from '../Playlist';
import Search from '../Search';
import Login from '../auth/Login';
import DrawerScreen from './DrawerScreen';

const Router = createDrawerNavigator({
  // Media: {
  //   screen: Player,
  //   navigationOptions: {
  //     drawerLabel: 'MEDIA',
  //     drawerIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />
  //   }
  // },
  // Playlist: {
  //   screen: Playlist,
  //   navigationOptions: {
  //     drawerLabel: 'PLAYLIST',
  //     drawerIcon: ({ tintColor }) => <Icon name="favorite" size={25} color={tintColor} />,
  //   }
  // },
  Home: {
    screen: createBottomTabNavigator({
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
      }
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
    })
  },
  Login: {
    screen: createStackNavigator({
      Login: {
        screen: Login
      }
    }, {
      headerMode: 'none',
      mode: 'modal'
    }),
  }
}, {
  contentComponent: props => (
    <DrawerScreen {...props}/>
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
});

class Root extends React.Component {
  componentDidMount() {
    this.getUser()
    .then(data => {
      const { token, userId } = data.credentials;
      this.props.fetchUser(userId, token);
    })
    this.props.fetchMusic()
    this.props.fetchDaily();
  };

  getUser() {
    return new Promise((resolve, reject) => {
      FBLoginManager.getCredentials((error, user) => {
        if (!error) {
          console.log(user);
          this.setState({ user : user.credentials });
          resolve(user);
        } else {
          this.setState({ user : null });
          reject(error)
        }
      });
    })
  };

  render() {
    return (
        <Router {...this.props} screenProps={this.props} />
    );
  }
}

const mapStateToProps = ({ tracks, daily, user }) => ({
  tracks: tracks.tracks,
  daily: daily.daily.dailyMessage,
  user: user.user
});

const mapDispatchToProps = { fetchMusic, fetchDaily, fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(Root);
