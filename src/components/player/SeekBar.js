import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { minutesAndSeconds } from '../../helpers';

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  },
});

const SeekBar = ({ duration, position, onSeek, onSlidingStart }) => {
  const elapsed = minutesAndSeconds(position);
  const remaining = minutesAndSeconds(duration - position);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>
          {`${elapsed[0]}:${elapsed[1]}`}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.text, { width: 40 }]}>
          {duration > 1 && `-${remaining[0]}:${remaining[1]}`}
        </Text>
      </View>
      <Slider
        maximumValue={Math.max(duration, 1, position + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={position}
        style={styles.slider}
        minimumTrackTintColor='#fff'
        maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
        thumbStyle={styles.thumb}
        trackStyle={styles.track}/>
    </View>
  );
};

SeekBar.propTypes = {
  duration: PropTypes.number,
  position: PropTypes.number,
  onSeek: PropTypes.func,
  onSlidingStart: PropTypes.func,
};

export default SeekBar;
