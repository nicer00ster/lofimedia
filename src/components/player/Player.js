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
  componentDidUpdate(prevProps) {
    if (prevProps.screenProps.tracks.index !== this.props.screenProps.tracks.index) {
      this.gallery.snapToItem(this.props.screenProps.tracks.index);
    }
  }
  handleShuffleAndRepeat = () => {
    if (this.props.screenProps.tracks.shuffle) {
      this.props.screenProps.shuffleSong();
    }
    if (this.props.screenProps.tracks.repeat) {
      this.setState({ position: 0 });
    }
    this.props.screenProps.nextSong();
  }
  onSwipe = () => {
    if (this.gallery.currentIndex > this.props.screenProps.tracks.index) {
      this.props.screenProps.nextSong();
    }
    if (this.gallery.currentIndex < this.props.screenProps.tracks.index) {
      this.props.screenProps.prevSong();
    }
  };
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
    // const uri = track.mp3url ? track.mp3url : 'https://s3.us-east-2.amazonaws.com/lofi-media/Profound+Beats+-+Lo-Fi.mp3';
    return (
      <Container
        navigation={navigation}
        avatar={screenProps.user.user.photoURL}
        daily={screenProps.daily}>
        {screenProps.tracks.fetching
          ? <Spinner type="9CubeGrid" size={100} color="#fff" style={{ flex: 1, alignSelf: 'center' }} />
          : <React.Fragment>
            <Carousel
              ref={c => { this.gallery = c; }}
              data={keys.map(i => screenProps.tracks.tracks[i])}
              renderItem={this.renderItem}
              itemWidth={imageWidth}
              sliderWidth={width}
              onSnapToItem={this.onSwipe}
            />
            <TrackDetails title={track.title} artist={track.artist} />
            <SeekBar
              onSeek={this.props.screenProps.seek}
              onSlidingStart={screenProps.pauseMusic}
              duration={this.props.screenProps.duration}
              position={this.props.screenProps.position} />
            <Controls
              forwardDisabled={screenProps.tracks.shuffle ? false : screenProps.tracks.index === Object.keys(screenProps.tracks.tracks).length - 1}
              onPressShuffle={screenProps.shuffleMusic}
              onPressRepeat={screenProps.repeatMusic}
              onPressPlay={screenProps.playMusic}
              onPressPause={screenProps.pauseMusic}
              onBack={screenProps.prevSong}
              onForward={this.handleShuffleAndRepeat}
              shuffle={screenProps.tracks.shuffle}
              repeat={screenProps.tracks.repeat}
              paused={screenProps.tracks.paused} />
            {/* <Video
              source={{ uri }}
              ref='audio'
              doNotDetach
              playInBackground={true}
              paused={screenProps.tracks.paused}
              repeat={screenProps.tracks.repeat}
              onLoadStart={this.loadStart}
              onLoad={this.setDuration.bind(this)}
              onProgress={this.setTime.bind(this)}
              progressUpdateInterval={1000}
              onEnd={screenProps.shuffleSong}
              onError={this.videoError}
            /> */}
          </React.Fragment>}
      </Container>
    );
  }
}

export default Player;
