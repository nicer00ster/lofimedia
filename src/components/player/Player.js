import React from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Spinner from 'react-native-spinkit';
import Carousel from 'react-native-snap-carousel';
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

  componentDidUpdate() {
    console.log('updated');
  }

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

  handleForward = () => {
    this._carousel.snapToNext();
    this.props.screenProps.nextSong();
  };

  handleBack = () => {
    this.props.screenProps.prevSong();
    this._carousel.snapToPrev();
  };

  onSwipe = () => {
    if(this._carousel.currentIndex >= this.props.screenProps.tracks.index) {
      console.log('current', this._carousel.currentIndex, 'prev',this.props.screenProps.tracks.index);
      this.props.screenProps.nextSong()
    }
    if(this._carousel.currentIndex < this.props.screenProps.tracks.index) {
      console.log('current', this._carousel.currentIndex, 'prev',this.props.screenProps.tracks.index);
      this.props.screenProps.prevSong()
    }
  };

  renderLoading() {
    return <Spinner type="9CubeGrid" size={100} color="#fff" style={{ flex: 1, alignSelf: 'center' }} />
  };

  _renderItem({ item, index }) {
    return (
      <View style={styles.container, { padding: 2, marginBottom: 6 }}>
        <TouchableOpacity style={{ elevation: 12, backgroundColor: '#000', borderRadius: 6 }}>
          <Image style={styles.image} source={{ uri: item.photoURL }}/>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    const { screenProps } = this.props;

    let playlist = screenProps.user.user.playlist ? screenProps.user.user.playlist : null;
    const keys = Object.keys(screenProps.tracks.tracks);
    let track = Object.assign({}, screenProps.tracks.tracks[keys[screenProps.tracks.index]]);
    let uri = track.mp3url ? track.mp3url : "https://s3.us-east-2.amazonaws.com/lofi-media/Profound+Beats+-+Lo-Fi.mp3";
    return (
      <Container navigation={navigation} avatar={screenProps.user.user.photoURL} daily={screenProps.daily}>
        {screenProps.tracks.fetching
          ? this.renderLoading()
          : <React.Fragment>
            <Carousel
              ref={c => { this._carousel = c; }}
              data={keys.map(i => screenProps.tracks.tracks[i])}
              renderItem={this._renderItem}
              itemWidth={imageHeight}
              sliderWidth={width}
              onSnapToItem={this.onSwipe}
            />
            {/* <AlbumArt
              carousel={this._carousel}
              playlist={playlist}
              current={track}
              trackID={track.uid}
              remove={screenProps.playlistRemove}
              add={screenProps.playlistAdd}
              hearts={track.hearts}
              tracks={screenProps.tracks.tracks}
              uid={screenProps.user.user.uid}
              url={track.photoURL} /> */}
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
              onBack={this.handleBack}
              onForward={this.handleForward}
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

const { width, height } = Dimensions.get('window');
const imageWidth = width - 24
const imageHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent'
    // paddingLeft: 24,
    // paddingRight: 24,
  },
  iconOverlay: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    // paddingLeft: 24,
    // paddingRight: 24,
    margin: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  image: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    width: 'auto',
    height: imageHeight,
  },
  heartContainer: {
    position: 'absolute',
    paddingBottom: 5,
  },
  heartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

export default Player;
