import React from 'react';
import { View, Text, StatusBar, Image, Button } from 'react-native';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { fetchMusic, fetchDaily, fetchUser } from '../../actions';

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
      shuffleOn: false
    };
  };
  componentDidMount() {
    this.props.fetchMusic();
    this.props.fetchDaily();
    this.props.fetchUser();
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
    if (this.state.selectedTrack < this.props.tracks.length - 1) {
      this.refs.audioRef && this.refs.audioRef.seek(0);
      this.setState({ changingTrack: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        changingTrack: false,
        selectedTrack: this.state.shuffleOn ? Math.floor(Math.random() * this.props.tracks.length) : this.state.selectedTrack + 1,
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


  render() {
    const track = Object.assign({}, this.props.tracks[this.state.selectedTrack]);
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
        <Header daily={this.props.daily} openDrawer={this.props.navigation.openDrawer} />
        <AlbumArt url={track.trackphoto} />
        <TrackDetails title={track.title} artist={track.artist} />
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({ paused: true })}
          currentPosition={this.state.currentPosition} />
        <Controls
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
          onPressShuffle={() => this.onShuffle()}
          onPressRepeat={() => this.onRepeat()}
          onPressPlay={() => this.setState({ paused: false })}
          onPressPause={() => this.setState({ paused: true })}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused}/>
        {player}
      </View>
    );
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

const mapStateToProps = state => ({
  tracks: state.tracks.tracks,
  daily: state.daily.daily.dailyMessage,
  user: state.user.user
});

const mapDispatchToProps = { fetchMusic, fetchDaily, fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(Player);
