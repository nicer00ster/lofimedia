import React from 'react';
import Video from 'react-native-video';
import Spinner from 'react-native-spinkit';
import { View, Text, StatusBar, Image } from 'react-native';
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

  // seek(time) {
  //   time = Math.round(time);
  //   this.refs.audioRef && this.refs.audioRef.seek(time);
  //   this.setState({
  //     currentPosition: time,
  //     paused: false,
  //   });
  // };

  // onBack() {
  //   if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
  //     this.refs.audioRef && this.refs.audioRef.seek(0);
  //     this.setState({ changingTrack: true });
  //     setTimeout(() => this.setState({
  //       currentPosition: 0,
  //       paused: false,
  //       totalLength: 1,
  //       changingTrack: false,
  //       selectedTrack: this.state.selectedTrack - 1,
  //     }), 0);
  //   } else {
  //     this.refs.audioRef.seek(0);
  //     this.setState({
  //       currentPosition: 0,
  //     });
  //   };
  // };
  //
  // onForward() {
  //   if (this.state.selectedTrack < this.props.screenProps.tracks.tracks.length - 1) {
  //     this.refs.audioRef && this.refs.audioRef.seek(0);
  //     this.setState({ changingTrack: true });
  //     setTimeout(() => this.setState({
  //       currentPosition: 0,
  //       totalLength: 1,
  //       paused: false,
  //       changingTrack: false,
  //       selectedTrack: this.state.shuffleOn ? Math.floor(Math.random() * this.props.screenProps.tracks.tracks.length) : this.state.selectedTrack + 1,
  //     }), 0);
  //   };
  // };

  renderLoading() {
    return <Spinner type="9CubeGrid" size={100} color="white" style={{ flex: 1, alignSelf: 'center' }}/>
  };

  render() {
    const { navigation } = this.props;
    const { screenProps } = this.props;
    // const config = {
    //   velocityThreshold: 0.3,
    //   directionalOffsetThreshold: 80
    // };
    const track = Object.assign({}, screenProps.tracks.tracks[screenProps.tracks.index]);
    // const player = this.state.changingTrack ? null : (
    //   <Video
    //     source={{ uri: track.mp3url }}
    //     ref="audioRef"
    //     playInBackground={true}
    //     paused={this.state.paused}
    //     resizeMode="cover"
    //     repeat={this.state.repeatOn}
    //     onLoadStart={this.loadStart}
    //     onLoad={this.setDuration.bind(this)}
    //     onProgress={this.setTime.bind(this)}
    //     onEnd={this.onForward.bind(this)}
    //     onError={this.videoError}
    //     style={styles.audioRef} />
    //   );
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
            this.props.screenProps.tracks.fetching
            ? this.renderLoading()
            : <React.Fragment>
              <Header navigation={navigation} avatar={screenProps.user.user.photoURL} daily={screenProps.daily} openDrawer={navigation.openDrawer} />
              {/* <GestureRecognizer
                onSwipeLeft={() => this.onForward()}
                onSwipeRight={() => this.onBack()}
                config={config}> */}
              <AlbumArt tracks={screenProps.tracks.tracks} url={track.trackphoto} />
              {/* </GestureRecognizer> */}
              <TrackDetails title={track.title} artist={track.artist} />
              <SeekBar
                onSeek={screenProps.seek}
                trackLength={screenProps.tracks.duration}
                onSlidingStart={screenProps.pauseMusic}
                currentPosition={screenProps.tracks.position} />
              <Controls
                repeatOn={screenProps.tracks.repeat}
                shuffleOn={screenProps.tracks.shuffle}
                forwardDisabled={screenProps.tracks.index === screenProps.tracks.tracks.length - 1}
                onPressShuffle={screenProps.shuffleMusic}
                onPressRepeat={screenProps.repeatMusic}
                onPressPlay={screenProps.playMusic}
                onPressPause={screenProps.pauseMusic}
                onBack={screenProps.prevSong}
                onForward={screenProps.nextSong}
                paused={screenProps.tracks.paused} />
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
