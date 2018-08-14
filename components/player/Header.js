import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const Header = ({ message, openDrawer, onQueuePress, onMessagePress }) => (
  <View style={styles.container}>
    {/* <TouchableOpacity onPress={openDrawer}>
      <Image style={styles.button} source={require('../../assets/img/baseline_expand_more_white_48dp.png')} />
    </TouchableOpacity> */}
    <Text onPress={onMessagePress} style={styles.message}>
      {message.toUpperCase()}
    </Text>
    <TouchableOpacity onPress={openDrawer}>
      <Image style={styles.button} source={require('../../assets/img/baseline_queue_music_white_48dp.png')} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    // textAlign: 'center',
    // color: 'rgba(255, 255, 255, 0.72)',
    // fontWeight: 'bold',
    // fontSize: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    margin: 8
  }
});

export default Header;
