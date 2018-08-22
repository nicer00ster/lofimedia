import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const Controls = ({
  paused,
  shuffle,
  repeat,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
}) => (
  <View style={styles.container}>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
      <Icon iconStyle={[styles.secondaryControl, shuffle ? [] : styles.off]} type="simple-line-icon" name="shuffle" color="white"/>
    </TouchableOpacity>
    <View style={{width: 40}} />
    <TouchableOpacity onPress={onBack}>
      <Icon type="simple-line-icon" name="control-start" color="white"/>
    </TouchableOpacity>
    <View style={{width: 20}} />
    {!paused
      ? <TouchableOpacity onPress={onPressPause}>
          <View style={styles.playButton}>
            <Icon type="simple-line-icon" name="control-pause" color="white"/>
          </View>
        </TouchableOpacity>
      : <TouchableOpacity onPress={onPressPlay}>
          <View style={styles.playButton}>
            <Icon type="simple-line-icon" name="control-play" color="white"/>
          </View>
        </TouchableOpacity>
    }
    <View style={{width: 20}} />
    <TouchableOpacity onPress={onForward}
      disabled={forwardDisabled}>
      <Icon style={[forwardDisabled && {opacity: 0.3}]} type="simple-line-icon" name="control-end" color="white" />
    </TouchableOpacity>
    <View style={{width: 40}} />
    <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
      <Icon iconStyle={[styles.secondaryControl, repeat ? [] : styles.off]} type="simple-line-icon" name="loop" color="white" />
    </TouchableOpacity>
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    opacity: 1
  },
  off: {
    opacity: 0.30,
  }
});
