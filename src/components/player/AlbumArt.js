import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { Icon, Badge } from 'react-native-elements';

class AlbumArt extends React.PureComponent {
  render() {
    const { playlist, add, remove, url, tracks, trackID, uid, current } = this.props;
    let toggleHeart = playlist === null ? '#1f222e' : playlist[trackID] ? 'rgb(255,135,136)' : '#1f222e';
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image style={styles.image} source={{ uri: url }}/>
          <View style={styles.iconOverlay}>
            <Icon
              type="font-awesome"
              name="heart"
              color={toggleHeart}
              size={50}
              // containerStyle={{ backgroundColor: toggleHeart }}
              // raised
              onPress={() =>
                playlist !== null && playlist[trackID]
                ? remove(current, uid, trackID)
                : add(current, uid, trackID)} />
            <Badge
              containerStyle={{ backgroundColor: 'rgba(31, 34, 46, 0.25)', height: 25, width: 25, padding: 5, marginLeft: 25 }}
              wrapperStyle={styles.heartContainer}
              textStyle={styles.heartText}
              onPress={() => this.props.remove(this.props.track, this.props.uid, this.props.trackID)}
              value={this.props.hearts} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
};

const { width, height } = Dimensions.get('window');
const imageWidth = width - 24
const imageHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingLeft: 24,
    paddingRight: 24,
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
    borderWidth: .5,
    borderRadius: 1,
    width: imageWidth,
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

export default AlbumArt;
