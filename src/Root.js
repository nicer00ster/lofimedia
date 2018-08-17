import React from 'react';
import { connect } from 'react-redux';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { addNavigationHelpers } from 'react-navigation';
import { fetchMusic, fetchDaily, fetchUser } from './actions';

import Nav from './components/router/Router';
import Player from './components/player/Player';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchMusic();
    this.props.fetchDaily();
    this.props.fetchUser();
  }
  render() {
    return (
      <Nav />
    )
  };
};

const mapStateToProps = state => ({
  tracks: state.tracks.tracks,
  daily: state.daily.daily.dailyMessage,
  user: state.user.user
});

mapDispatchToProps = { fetchMusic, fetchDaily, fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(Root);
