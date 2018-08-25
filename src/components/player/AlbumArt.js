import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { Icon } from 'react-native-elements';

class AlbumArt extends React.PureComponent {
  render() {
    const { playlist, add, remove, url, tracks, trackID, playing, uid } = this.props;
    let toggleHeart = playlist === null ? '#fff' : playlist[trackID] ? 'rgb(255,135,136)' : '#fff';
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image style={styles.image} source={{ uri: url }}/>
          <View style={styles.iconOverlay}>
            <Icon
              type="font-awesome"
              name="heart"
              color="#1f222e"
              containerStyle={{ backgroundColor: toggleHeart }}
              raised
              onPress={() =>
                playlist !== null && playlist[trackID]
                ? remove(playing, uid, trackID)
                : add(playing, uid, trackID)} />
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
});

export default AlbumArt;
