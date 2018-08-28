import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import Video from 'react-native-video';
import Spinner from 'react-native-spinkit';
import Carousel from 'react-native-snap-carousel';
import Gallery from './Gallery';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Container from '../Container';

const { width } = Dimensions.get('window');
const imageWidth = width - 76;

class Player extends React.Component {
  static propTypes = {
    screenProps: PropTypes.object,
    tracks: PropTypes.object,
    user: PropTypes.object,
    playlist: PropTypes.object,
    playlistRemove: PropTypes.func,
    playlistAdd: PropTypes.func,
    uid: PropTypes.string,
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      duration: 1,
      position: 0,
    };
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audio && this.refs.audio.seek(time);
    this.setState({ position: time });
  }

  setDuration(data) {
    this.setState({ duration: Math.floor(data.duration) });
  }

  setTime(data) {
    this.setState({ position: Math.floor(data.currentTime) });
  }

  handleForward = () => {
    this.props.screenProps.nextSong();
    this.gallery.snapToNext();
  }

  handleBack = () => {
    this.props.screenProps.prevSong();
    this.gallery.snapToPrev();
  }

  onSwipe = () => {
    if (this.gallery.currentIndex > this.props.screenProps.tracks.index) {
      this.props.screenProps.nextSong();
    }
    if (this.gallery.currentIndex < this.props.screenProps.tracks.index) {
      this.props.screenProps.prevSong();
    }
  };

  renderLoading() {
    return <Spinner type="9CubeGrid" size={100} color="#fff" style={{ flex: 1, alignSelf: 'center' }} />
  }

  renderItem = ({ item }) => {
    const playlist = this.props.screenProps.user.user.playlist ? this.props.screenProps.user.user.playlist : null;
    return (
      <Gallery
        playlist={playlist}
        current={item}
        trackID={item.uid}
        remove={this.props.screenProps.playlistRemove}
        add={this.props.screenProps.playlistAdd}
        hearts={item.hearts}
        tracks={this.props.screenProps.tracks.tracks}
        uid={this.props.screenProps.user.user.uid}
        url={item.photoURL} />
    );
  };

  render() {
    const { navigation } = this.props;
    const { screenProps } = this.props;

    const keys = Object.keys(screenProps.tracks.tracks);
    const track = Object.assign({}, screenProps.tracks.tracks[keys[screenProps.tracks.index]]);
    const uri = track.mp3url ? track.mp3url : 'https://s3.us-east-2.amazonaws.com/lofi-media/Profound+Beats+-+Lo-Fi.mp3';
    return (
      <Container
        navigation={navigation}
        avatar={screenProps.user.user.photoURL}
        daily={screenProps.daily}>
        {screenProps.tracks.fetching
          ? this.renderLoading()
          : <React.Fragment>
            <Carousel
              ref={(c) => { this.gallery = c; }}
              data={keys.map(i => screenProps.tracks.tracks[i])}
              renderItem={this.renderItem}
              itemWidth={imageWidth}
              sliderWidth={width}
              onSnapToItem={this.onSwipe}
            />
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
              source={{ uri }}
              ref={(a) => { this.audio = a; }}
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
    );
  }
}

export default Player;
