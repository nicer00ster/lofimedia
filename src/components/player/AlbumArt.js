import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native';

const AlbumArt = ({ url, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.image} source={{ uri: url }}/>
    </TouchableOpacity>
  </View>
);

const { width, height } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    borderWidth: .5,
    borderRadius: 1,
    width: imageSize,
    height: imageSize,
  }
});

export default AlbumArt;
