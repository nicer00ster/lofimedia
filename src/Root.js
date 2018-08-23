import React from 'react';
import { connect } from 'react-redux';
import {
  fetchMusic,
  fetchDaily,
  onfbLogin,
  onfbLogout,
  updateUserInfo,
  playMusic,
  pauseMusic,
  shuffleMusic,
  repeatMusic,
  nextSong,
  prevSong,
  setDuration,
  setTime,
  seek,
  searchMusic
} from './actions';

import { fetchUser } from './auth/index';
import Navigator from './components/router/Router';

class Root extends React.Component {
  componentDidMount() {
    fetchUser(this.props.updateUserInfo);
    this.props.fetchMusic();
    this.props.fetchDaily();
  };

  render() {
    return <Navigator {...this.props} screenProps={this.props} />
  };
};

const mapStateToProps = ({ tracks, daily, user, search }) => ({
  tracks: tracks,
  user: user,
  daily: daily.daily.dailyMessage,
  search: search
});

const mapDispatchToProps = {
  fetchMusic,
  fetchDaily,
  onfbLogin,
  onfbLogout,
  updateUserInfo,
  playMusic,
  pauseMusic,
  shuffleMusic,
  repeatMusic,
  nextSong,
  prevSong,
  searchMusic
  // setDuration,
  // setTime,
  // seek
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
