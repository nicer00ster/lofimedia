import React from 'react';
import { Dimensions } from 'react-native';
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
      position: 0,
      trigger: false
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

  handleForward = () => {
    this.props.screenProps.nextSong();
    this._carousel.snapToNext();
  };

  handleBack = () => {
    this.props.screenProps.prevSong();
    this._carousel.snapToPrev();
  };

  onSwipe = () => {
    if(this._carousel.currentIndex > this.props.screenProps.tracks.index) {
      this.props.screenProps.nextSong();
    }
    if(this._carousel.currentIndex < this.props.screenProps.tracks.index) {
      this.props.screenProps.prevSong();
    }
  };

  renderLoading() {
    return <Spinner type="9CubeGrid" size={100} color="#fff" style={{ flex: 1, alignSelf: 'center' }} />
  };

  _renderItem = ({ item, index }) => {
    let playlist = this.props.screenProps.user.user.playlist ? this.props.screenProps.user.user.playlist : null;
    return (
      <AlbumArt
        playlist={playlist}
        current={item}
        trackID={item.uid}
        remove={this.props.screenProps.playlistRemove}
        add={this.props.screenProps.playlistAdd}
        hearts={item.hearts}
        tracks={this.props.screenProps.tracks.tracks}
        uid={this.props.screenProps.user.user.uid}
        url={item.photoURL} />
    )
  }

  render() {
    const { navigation } = this.props;
    const { screenProps } = this.props;

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
const imageHeight = width - 76;

export default Player;
