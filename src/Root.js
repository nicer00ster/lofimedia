import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchMusic,
  fetchDaily,
  fetchPlaylist,
  onfbLogin,
  onfbLogout,
  updateUserInfo,
  playMusic,
  pauseMusic,
  shuffleMusic,
  shuffleSong,
  repeatMusic,
  nextSong,
  prevSong,
  searchMusic,
  playlistAdd,
  playlistRemove,
  addTrack,
  globalPlay,
} from './actions';

import { fetchUser } from './auth/index';
import Navigator from './components/router/Router';

class Root extends React.Component {
  static propTypes = {
    updateUserInfo: PropTypes.func,
    fetchMusic: PropTypes.func,
    fetchDaily: PropTypes.func,
    fetchPlaylist: PropTypes.func,
    user: PropTypes.object,
  }
  componentDidMount() {
    fetchUser(this.props.updateUserInfo);
    this.props.fetchMusic();
    this.props.fetchDaily();
    this.timeout = setTimeout(() => {
      this.props.fetchPlaylist(this.props.user.user.uid);
    }, 1000);
  }
  render() {
    return <Navigator {...this.props} screenProps={this.props} />;
  }
}

const mapStateToProps = ({ tracks, daily, user, search }) => ({
  tracks,
  user,
  search,
  daily: daily.daily.dailyMessage,
});

const mapDispatchToProps = {
  fetchMusic,
  fetchDaily,
  fetchPlaylist,
  onfbLogin,
  onfbLogout,
  updateUserInfo,
  playMusic,
  pauseMusic,
  shuffleMusic,
  repeatMusic,
  nextSong,
  prevSong,
  shuffleSong,
  searchMusic,
  playlistAdd,
  playlistRemove,
  addTrack,
  globalPlay,
  // setDuration,
  // setTime,
  // seek
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
