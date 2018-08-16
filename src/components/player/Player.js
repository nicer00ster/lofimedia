import React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { fetchMusic } from '../../actions';

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
  };

  setDuration(data) {
    this.setState({ totalLength: Math.floor(data.duration) });
  };

  setTime(data) {
    this.setState({ currentPosition: Math.floor(data.currentTime) });
  };

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  };

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ changingTrack: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        changingTrack: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    };
  };

  onForward() {
    if (this.state.selectedTrack < this.props.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
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
      this.setState({ shuffleOn: false })
    };
  };

  onRepeat() {
    this.setState({ repeatOn: !this.state.repeatOn });
    if(this.state.shuffleOn) {
      this.setState({ repeatOn: false })
    };
  };


  render() {
    const track = Object.assign({}, this.props.tracks[this.state.selectedTrack]);
    const player = this.state.changingTrack ? null : (
      <Video source={{ uri: track.mp3url }}
        ref="audioElement"
        paused={this.state.paused}
        resizeMode="cover"
        repeat={this.state.repeatOn}
        onLoadStart={this.loadStart}
        onLoad={this.setDuration.bind(this)}
        onProgress={this.setTime.bind(this)}
        onEnd={this.onForward.bind(this)}
        onError={this.videoError}
        style={styles.audioElement} />
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
        <Header message="KEEP CALM" openDrawer={this.props.navigation.openDrawer} />
        <AlbumArt url={track.trackphoto} />
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
  audioElement: {
    height: 0,
    width: 0,
  }
};

const mapStateToProps = state => ({
  tracks: state.tracks.tracks
});

const mapDispatchToProps = { fetchMusic };

export default connect(mapStateToProps, mapDispatchToProps)(Player);
