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
  nextSong,
  prevSong,
} from './actions';
import { fetchUser } from './auth/index';
import Router from './components/router/Router';
import Video from 'react-native-video';


class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    fetchUser(this.props.updateUserInfo);
    this.props.fetchMusic();
    this.props.fetchDaily();
  };

  render() {
    const { tracks } = this.props;
    const track = Object.assign({}, this.props.tracks.tracks[this.props.tracks.index]);
    return (
      <React.Fragment>
        <Router {...this.props} screenProps={this.props} />
        <Video
          source={{ uri: track.mp3url }}
          ref="audioRef"
          playInBackground={true}
          paused={tracks.paused}
          resizeMode="cover"
          // repeat={this.state.repeatOn}
          onLoadStart={this.loadStart}
          // onLoad={this.setDuration.bind(this)}
          // onProgress={this.setTime.bind(this)}
          // onEnd={this.onForward.bind(this)}
          onError={this.videoError}
          // style={styles.audioRef}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ tracks, daily, user }) => ({
  tracks: tracks,
  user: user,
  daily: daily.daily.dailyMessage,
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
  nextSong,
  prevSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
