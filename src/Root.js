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
  seek
} from './actions';

import { fetchUser } from './auth/index';
import Navigator from './components/router/Router';
import Video from 'react-native-video';
// import Player from './components/player/Player';

class Root extends React.Component {
  componentDidMount() {
    fetchUser(this.props.updateUserInfo);
    this.props.fetchMusic();
    this.props.fetchDaily();
    this.audio = React.createRef();
  };

  render() {
    const { tracks, setDuration, setTime, nextSong } = this.props;
    const track = Object.assign({}, this.props.tracks.tracks[this.props.tracks.index]);
    return (
      <React.Fragment>
        <Navigator {...this.props} audioRef={this.audio} screenProps={this.props} />
        <Video
          source={{ uri: track.mp3url }}
          ref={this.audio}
          playInBackground={true}
          paused={tracks.paused}
          repeat={tracks.repeat}
          onLoadStart={this.loadStart}
          onLoad={setDuration.bind(this)}
          onProgress={setTime.bind(this)}
          progressUpdateInterval={1000}
          onEnd={nextSong}
          onError={this.videoError}
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
  repeatMusic,
  nextSong,
  prevSong,
  setDuration,
  setTime,
  seek
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);

// const ConnectedRoot = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Root);

// export default React.forwardRef((props, ref) => {
//   return <ConnectedRoot {...props} forwardedRef={ref => this.audio = ref} />
// });
