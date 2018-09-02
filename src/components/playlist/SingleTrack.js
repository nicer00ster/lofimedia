import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import styles from './SingleTrack.styles';

class SingleTrack extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    playlist: PropTypes.object,
    uid: PropTypes.string,
    screenProps: PropTypes.object,
    playlistRemove: PropTypes.func,
    playlistAdd: PropTypes.func,
    remove: PropTypes.func,
    track: PropTypes.object,
    trackID: PropTypes.string,
  }
  handleHeart() {
    const { navigation } = this.props;
    const { playlist, uid } = this.props.screenProps.user.user;
    if (playlist[navigation.state.params.uid]) {
      this.props.screenProps.playlistRemove(navigation.state.params, uid, navigation.state.params.uid);
      navigation.goBack();
    } else {
      this.props.screenProps.playlistAdd(navigation.state.params, uid, navigation.state.params.uid);
    }
  }
  handlePlay() {
    this.props.navigation.goBack();
    this.props.navigation.navigate('Media');
    this.props.screenProps.globalPlay(this.props.screenProps.tracks.tracks, this.props.navigation.state.params.uid);
    this.props.screenProps.playMusic();
  }
  render() {
    const { navigation } = this.props;
    const { playlist } = this.props.screenProps.user.user;
    const toggleHeart = playlist === null ? '#1f222e' : playlist[navigation.state.params.uid] ? 'rgb(255,135,136)' : '#1f222e';
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: navigation.state.params.photoURL }} />
          <View style={[styles.imageText, styles.overlay]}>
            <Text style={styles.title}>{navigation.state.params.title}</Text>
            <Text style={styles.artist}>{navigation.state.params.artist}</Text>
          </View>
          <View style={styles.play}>
            <TouchableOpacity onPress={() => this.handlePlay()}>
              <Icon type="font-awesome" size={125} name="play-circle" color='#fff'/>
            </TouchableOpacity>
          </View>
          <View style={styles.add}>
            <Icon
              type="font-awesome"
              name="heart"
              size={50}
              color={toggleHeart}
              onPress={() => this.handleHeart()}
              />
              <Badge
                containerStyle={styles.badge}
                wrapperStyle={styles.heartContainer}
                textStyle={styles.heartText}
                value={this.props.screenProps.tracks.tracks[navigation.state.params.uid].hearts} />
          </View>
        </View>
      </View>
    );
  }
}

export default SingleTrack;
