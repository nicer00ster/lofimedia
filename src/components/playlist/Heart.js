import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class Heart extends React.PureComponent {
  render() {
    return (
      <View {...this.props} style={[styles.heart, this.props.style]}>
          <View style={styles.leftHeart} />
          <View style={styles.rightHeart} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  heart: {
    width: 50,
    height: 50
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#6427d1',
  },
  leftHeart: {
    transform: [
        {rotate: '-45deg'}
    ],
    left: 5
  },
  rightHeart: {
    transform: [
        {rotate: '45deg'}
    ],
    right: 5
  }
})
