import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Icon, Avatar } from 'react-native-elements'
import TextTicker from 'react-native-text-ticker';

const Header = ({ message, openDrawer, onQueuePress, onMessagePress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={openDrawer}>
      <Avatar
        small
        rounded
        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.75}
      />
    </TouchableOpacity>
    {/* <Text onPress={onMessagePress} style={styles.message}>
      {message.toUpperCase()}
    </Text> */}
    <View style={{ width: 200 }}>
      <TextTicker
        style={styles.message}
        duration={3000}
        loop
        scroll
        bounce={false}
        // repeatSpacer={100}
        marqueeDelay={0}>
        Streaming from Firebase
      </TextTicker>
    </View>
    <TouchableOpacity onPress={openDrawer}>
      <Icon style={styles.button} type="simple-line-icon" name="menu" color="white"/>
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
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    // textAlign: 'center',
    margin: 8
  }
});

export default Header;
