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

const { width } = Dimensions.get('window');
const imageHeight = width - 76;
const imageWidth = width - 24;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 2,
    width: imageWidth,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
  },
  iconOverlay: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    margin: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'transparent',
    width: 'auto',
    height: imageHeight,
  },
  imageContainer: {
    ...Platform.select({
      ios: {
        borderRadius: 2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 16 },
        shadowColor: '#000',
        shadowOpacity: 0.75,
      },
      android: {
        elevation: 12,
        backgroundColor: '#000',
        borderRadius: 2,
      },
    }),
  },
  heartContainer: {
    position: 'absolute',
    paddingBottom: 5,
  },
  heartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: 'rgba(31, 34, 46, 0.25)',
    height: 25,
    width: 25,
    padding: 5,
    marginLeft: 25,
  },
});

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
