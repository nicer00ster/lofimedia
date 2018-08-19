import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

const AlbumArt = ({ url, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={{ uri: url }}/>
    </TouchableOpacity>
    <View style={styles.imageText}>
      <Icon
        type="font-awesome"
        name="heart"
        color="#1f222e"
        raised
        onPress={() => console.log('You liked this song')}
        />
    </View>
  </View>
);

const { width, height } = Dimensions.get('window');
const imageWidth = width - 24
const imageHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    alignSelf: 'center'
  },
  imageText: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 24,
    paddingRight: 24,
    margin: 15,
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
