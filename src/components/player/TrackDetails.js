import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
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
  },
});

const TrackDetails = ({ title, artist, onPressPlaylist, onMorePress, onTitlePress, onArtistPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPressPlaylist}>
      <Icon type="simple-line-icon" name="playlist" color="white" size={35} />
    </TouchableOpacity>
    <View style={styles.detailsWrapper}>
      <Text style={styles.title} onPress={onTitlePress}>{title}</Text>
      <Text style={styles.artist} onPress={onArtistPress}>{artist}</Text>
    </View>
    <TouchableOpacity onPress={onMorePress}>
      <Icon type="simple-line-icon" name="options" color="white" />
    </TouchableOpacity>
  </View>
);

TrackDetails.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
  onAddPress: PropTypes.func,
  onMorePress: PropTypes.func,
  onTitlePress: PropTypes.func,
  onArtistPress: PropTypes.func,
};


export default TrackDetails;
