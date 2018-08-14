import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions  } from 'react-native';

const TrackDetails = ({ title, artist, onAddPress, onMorePress, onTitlePress, onArtistPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onAddPress}>
      <Image style={styles.button} source={require('../../assets/img/baseline_playlist_add_white_48dp.png')} />
    </TouchableOpacity>
    <View style={styles.detailsWrapper}>
      <Text style={styles.title} onPress={onTitlePress}>{title}</Text>
      <Text style={styles.artist} onPress={onArtistPress}>{artist}</Text>
    </View>
    <TouchableOpacity onPress={onMorePress}>
      <View style={styles.moreButton}>
        <Image style={styles.moreButton} source={require('../../assets/img/baseline_more_horiz_white_48dp.png')}/>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
  },
  button: {
    opacity: 0.72,
  },
  moreButton: {
    opacity: 0.72,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonIcon: {
    height: 17,
    width: 17,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    marginTop: 4,
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});

export default TrackDetails;
