import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import firebase from './config/firebase';
import {
  fetchMusic,
  fetchDaily,
  fetchPlaylist,
  fetchUsers,
  onfbLogin,
  onfbLogout,
  updateUserInfo,
  playMusic,
  pauseMusic,
  shuffleMusic,
  shuffleSong,
  repeatMusic,
  followUser,
  unfollowUser,
  // repeatSong,
  nextSong,
  prevSong,
  searchMusic,
  playlistAdd,
  playlistRemove,
  addTrack,
  globalPlay,
  toggleNotifications,
} from './actions';

import { fetchUser } from './auth/index';
import Navigator from './components/router/Router';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 1,
      position: 0,
    };
  }
  static propTypes = {
    updateUserInfo: PropTypes.func,
    fetchMusic: PropTypes.func,
    fetchDaily: PropTypes.func,
    fetchPlaylist: PropTypes.func,
    user: PropTypes.object,
  }
  componentDidMount() {
    fetchUser(this.props.updateUserInfo);
    this.props.fetchMusic();
    this.props.fetchDaily();
    this.props.fetchUsers();
    setTimeout(() => {
      this.props.fetchPlaylist(this.props.user.user.uid);
    }, 1000);

    this.unsubscribeFromNotificationListener = firebase.notifications().onNotification(notification => {
      if (Platform.OS === 'android') {
        const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true,
        })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId('root1337')
          .android.setColor('#000000')
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      } else if (Platform.OS === 'ios') {
        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .ios.setBadge(notification.ios.badge);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromNotificationListener();
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
  render() {
    const keys = Object.keys(this.props.tracks.tracks);
    const track = Object.assign({}, this.props.tracks.tracks[keys[this.props.tracks.index]]);
    const uri = track.mp3url ? track.mp3url : 'https://s3.us-east-2.amazonaws.com/lofi-media/Profound+Beats+-+Lo-Fi.mp3';
    return (
      <React.Fragment>
        <Video
          source={{ uri }}
          ref='audio'
          playInBackground={true}
          paused={this.props.tracks.paused}
          repeat={this.props.tracks.repeat}
          // onLoadStart={this.loadStart}
          onLoad={this.setDuration.bind(this)}
          onProgress={this.setTime.bind(this)}
          progressUpdateInterval={1000}
          onEnd={this.props.shuffleSong}
          onError={this.videoError}
        />
        <Navigator
          {...this.props}
          screenProps={{
            ...this.props,
            seek: this.seek.bind(this),
            duration: this.state.duration,
            position: this.state.position,
          }}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ tracks, daily, user, search }) => ({
  tracks,
  user,
  search,
  daily: daily.daily.dailyMessage,
});

const mapDispatchToProps = {
  fetchMusic,
  fetchDaily,
  fetchPlaylist,
  fetchUsers,
  onfbLogin,
  onfbLogout,
  updateUserInfo,
  playMusic,
  pauseMusic,
  shuffleMusic,
  repeatMusic,
  nextSong,
  prevSong,
  shuffleSong,
  followUser,
  unfollowUser,
  // repeatSong,
  searchMusic,
  playlistAdd,
  playlistRemove,
  addTrack,
  globalPlay,
  toggleNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
