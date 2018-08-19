import React from 'react';
import Video from 'react-native-video';
import Spinner from 'react-native-spinkit';
import { View, Text, StatusBar, Image, Button, Animated } from 'react-native';
import { checkObject } from '../../helpers';
import { Transition } from 'react-navigation-fluid-transitions';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
      animateImageX: 0
    };
  };

  setDuration(data) {
    this.setState({ totalLength: Math.floor(data.duration) });
  };

  setTime(data) {
    this.setState({ currentPosition: Math.floor(data.currentTime) });
  };

  seek(time) {
    time = Math.round(time);
    this.refs.audioRef && this.refs.audioRef.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  };

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioRef && this.refs.audioRef.seek(0);
      this.setState({ changingTrack: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        changingTrack: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioRef.seek(0);
      this.setState({
        currentPosition: 0,
      });
    };
  };

  onForward() {
    if (this.state.selectedTrack < this.props.screenProps.tracks.length - 1) {
      this.refs.audioRef && this.refs.audioRef.seek(0);
      this.setState({ changingTrack: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        changingTrack: false,
        selectedTrack: this.state.shuffleOn ? Math.floor(Math.random() * this.props.screenProps.tracks.length) : this.state.selectedTrack + 1,
      }), 0);
    };
  };

  onShuffle() {
    this.setState({ shuffleOn: !this.state.shuffleOn });
    if(this.state.repeatOn) {
      this.setState({ repeatOn: false, shuffleOn: true });
    };
  };

  onRepeat() {
    this.setState({ repeatOn: !this.state.repeatOn });
    if(this.state.shuffleOn) {
      this.setState({ shuffleOn: false, repeatOn: true });
    };
  };

  renderLoading() {
    return <Spinner type="9CubeGrid" size={100} color="white" style={{ flex: 1, alignSelf: 'center' }}/>
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    const track = Object.assign({}, this.props.screenProps.tracks[this.state.selectedTrack]);
    const player = this.state.changingTrack ? null : (
      <Video
        source={{ uri: track.mp3url }}
        ref="audioRef"
        playInBackground={true}
        paused={this.state.paused}
        resizeMode="cover"
        repeat={this.state.repeatOn}
        onLoadStart={this.loadStart}
        onLoad={this.setDuration.bind(this)}
        onProgress={this.setTime.bind(this)}
        onEnd={this.onForward.bind(this)}
        onError={this.videoError}
        style={styles.audioRef} />
      );
      return (
        <View style={styles.container}>
          <Image
            source={require('../../assets/img/cover.jpg')}
            style={styles.background}
            resizeMode="cover"
            opacity={.25}
          />
          <StatusBar hidden={true} />
          {
            this.props.screenProps.user.fetchingUserData
            ? this.renderLoading()
            : <React.Fragment>
              <Header navigation={this.props.navigation} avatar={this.props.screenProps.user.user.photoURL} daily={this.props.screenProps.daily} openDrawer={this.props.navigation.openDrawer} />
              <GestureRecognizer
                onSwipeLeft={() => this.onForward()}
                onSwipeRight={() => this.onBack()}
                config={config}>
              <AlbumArt url={track.trackphoto} />
              </GestureRecognizer>
              <TrackDetails title={track.title} artist={track.artist} />
              <SeekBar
                onSeek={this.seek.bind(this)}
                trackLength={this.state.totalLength}
                onSlidingStart={() => this.setState({ paused: true })}
                currentPosition={this.state.currentPosition} />
              <Controls
                repeatOn={this.state.repeatOn}
                shuffleOn={this.state.shuffleOn}
                forwardDisabled={this.state.selectedTrack === this.props.screenProps.tracks.length - 1}
                onPressShuffle={() => this.onShuffle()}
                onPressRepeat={() => this.onRepeat()}
                onPressPlay={() => this.setState({ paused: false })}
                onPressPause={() => this.setState({ paused: true })}
                onBack={this.onBack.bind(this)}
                onForward={this.onForward.bind(this)}
                paused={this.state.paused} />
              {player}
              </React.Fragment>
          }
        </View>
      )
  };
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1f222e',
  },
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  audioRef: {
    height: 0,
    width: 0,
  }
};

export default Player;
