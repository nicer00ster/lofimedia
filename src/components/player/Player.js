import React from 'react';
import Video from 'react-native-video';
import Spinner from 'react-native-spinkit';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Navigator from '../router/Router';

import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Container from '../Container';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 1,
      position: 0
    };
  };

  seek(time) {
    time = Math.round(time);
    this.refs.audio && this.refs.audio.seek(time);
    this.setState({ position: time });
  };

  setDuration(data) {
    this.setState({ duration: Math.floor(data.duration) });
  };

  setTime(data) {
    this.setState({ position: Math.floor(data.currentTime) });
  };

  renderLoading() {
    return <Spinner type="9CubeGrid" size={100} color="#fff" style={{ flex: 1, alignSelf: 'center' }}/>
  };

  render() {
    const { navigation } = this.props;
    const { screenProps } = this.props;

    let keys = Object.keys(screenProps.tracks.tracks);
    let track = Object.assign({}, screenProps.tracks.tracks[keys[screenProps.tracks.index]]);
    let uri = track.mp3url ? track.mp3url : "https://s3.us-east-2.amazonaws.com/lofi-media/Profound+Beats+-+Lo-Fi.mp3";

    return (
      <Container navigation={navigation} avatar={screenProps.user.user.photoURL} daily={screenProps.daily}>
        {this.props.screenProps.tracks.fetching
          ? this.renderLoading()
          : <React.Fragment>
            <AlbumArt tracks={screenProps.tracks.tracks} url={track.photoURL} />
            <TrackDetails title={track.title} artist={track.artist} />
            <SeekBar
              onSeek={this.seek.bind(this)}
              onSlidingStart={screenProps.pauseMusic}
              duration={this.state.duration}
              position={this.state.position} />
            <Controls
              forwardDisabled={screenProps.tracks.index === Object.keys(screenProps.tracks.tracks).length - 1}
              onPressShuffle={screenProps.shuffleMusic}
              onPressRepeat={screenProps.repeatMusic}
              onPressPlay={screenProps.playMusic}
              onPressPause={screenProps.pauseMusic}
              onBack={screenProps.prevSong}
              onForward={screenProps.nextSong}
              shuffle={screenProps.tracks.shuffle}
              repeat={screenProps.tracks.repeat}
              paused={screenProps.tracks.paused} />
            <Video
              source={{ uri: uri }}
              ref='audio'
              playInBackground={true}
              paused={screenProps.tracks.paused}
              repeat={screenProps.tracks.repeat}
              onLoadStart={this.loadStart}
              onLoad={this.setDuration.bind(this)}
              onProgress={this.setTime.bind(this)}
              progressUpdateInterval={1000}
              onEnd={screenProps.nextSong}
              onError={this.videoError}
            />
          </React.Fragment>}
      </Container>
      )
  };
};

export default Player;
