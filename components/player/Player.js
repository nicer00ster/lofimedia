import React, { Component } from 'react';
import Video from 'react-native-video';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';

export const TRACKS = [
  {
    title: 'Stressed Out',
    artist: 'Twenty One Pilots',
    albumArtUrl: "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
    audioUrl: "https://audio.clyp.it/zttq0wmu.mp3?Expires=1534288736&Signature=d0ObZsDAVr4gsCpJmoElCO7YTUsFi1Jq7pvGO8ZayV4j~wjFGupRb6FPPLQkauIgcFgmT~DJICVTFl7p-30DTKnLcdETE2MazPuGLG8cER0pKawgC~25fDmHp776E2~mshB-ZrzswN8n9YPommVXj-bHxStoHec01zScBWHFFB0_&Key-Pair-Id=APKAJ4AMQB3XYIRCZ5PA",
  },
  {
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    albumArtUrl: "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
    audioUrl: 'https://audio.clyp.it/50vaqd1a.mp3?Expires=1534277390&Signature=pKqJFLPPCjXNTkPlJkNK5-rgVW7I~ZqIMfbhi~5PO7bE0pFgAwGhB7jVJCygRz0pZZBgu~rr9wsBmPI00Mq-1OPDmJzZl8dhUVXzi-RMbnMbLPe1qOxiQA7FzQrDTQUVbKHucQJymMxkI18UsQORrrCwDQPtw9-S7LVkdhIpf2E_&Key-Pair-Id=APKAJ4AMQB3XYIRCZ5PA',
  },
  {
    title: 'Hotline Bling',
    artist: 'Drake',
    albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    audioUrl: 'http://dl2.shirazsong.org/dl/music/94-10/CD%201%20-%20Best%20of%202015%20-%20Top%20Downloads/03.%20Drake%20-%20Hotline%20Bling%20.mp3',
  },
];

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
    };
  };

  setDuration(data) {
    this.setState({ totalLength: Math.floor(data.duration) });
  }

  setTime(data) {
    this.setState({ currentPosition: Math.floor(data.currentTime) });
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrack < TRACKS.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
    }
  };

  onShuffle() {
    this.setState({ shuffleOn: !this.state.shuffleOn })
    console.log(Math.floor(Math.random() * TRACKS.length));
  };


  render() {
    const track = TRACKS[this.state.selectedTrack];
    const player = this.state.isChanging ? null : (
      <Video source={{uri: track.audioUrl}} // Can be a URL or a local file.
        ref="audioElement"
        paused={this.state.paused}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={this.state.repeatOn}                // Repeat forever.
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onForward.bind(this)}           // Callback when playback finishes
        onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement} />
    );
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header message={`Streaming from something.`} openDrawer={this.props.navigation.openDrawer} />
        <AlbumArt url={track.albumArtUrl} />
        <TrackDetails title={track.title} artist={track.artist} />
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({ paused: true })}
          currentPosition={this.state.currentPosition} />
        <Controls
          onPressRepeat={() => this.setState({ repeatOn : !this.state.repeatOn })}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack === TRACKS.length - 1}
          onPressShuffle={() => this.onShuffle()}
          onPressPlay={() => this.setState({ paused: false })}
          onPressPause={() => this.setState({ paused: true })}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused}/>
        {player}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1f222e',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};
