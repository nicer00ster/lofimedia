import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { FBLoginManager } from 'react-native-facebook-login';

import { connect } from 'react-redux';
import { fetchMusic, fetchDaily, fetchUser } from '../../actions';

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
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    this.getUser()
    .then(data => {
      const { token, userId } = data.credentials;
      this.props.fetchUser(userId, token);
    })
    this.props.fetchMusic();
    this.props.fetchDaily();
    console.log(this.props.user);
  }
  getUser() {
    return new Promise((resolve, reject) => {
      FBLoginManager.getCredentials((error, user) => {
        if (!error) {
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

const mapStateToProps = state => ({
  tracks: state.tracks.tracks,
  daily: state.daily.daily.dailyMessage,
  user: state.user.user
});

const mapDispatchToProps = { fetchMusic, fetchDaily, fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(Root);
