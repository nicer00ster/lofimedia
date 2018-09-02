import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import styles from './Player.styles';

class Gallery extends React.PureComponent {
  static propTypes = {
    add: PropTypes.func,
    remove: PropTypes.func,
    url: PropTypes.string,
    trackID: PropTypes.string,
    uid: PropTypes.string,
    current: PropTypes.object,
    hearts: PropTypes.number,
    onPress: PropTypes.func,
  }
  render() {
    const {
      playlist,
      add,
      remove,
      url,
      trackID,
      uid,
      current,
    } = this.props;
    const toggleHeart = playlist === null ? '#1f222e' : playlist[trackID] ? 'rgb(255,135,136)' : '#1f222e';
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer} onPress={this.props.onPress}>
          <Image style={styles.image} source={{ uri: url }}/>
          <View style={styles.iconOverlay}>
            <Icon
              type="font-awesome"
              name="heart"
              color={toggleHeart}
              size={50}
              onPress={() =>
                playlist !== null && playlist[trackID]
                ? remove(current, uid, trackID)
                : add(current, uid, trackID)} />
            <Badge
              containerStyle={styles.badge}
              wrapperStyle={styles.heartContainer}
              textStyle={styles.heartText}
              value={this.props.hearts} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Gallery;
