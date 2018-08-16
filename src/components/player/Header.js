import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import MarqueeText from 'react-native-marquee';

const Header = ({ daily, message, openDrawer, onQueuePress, onMessagePress }) => (
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
    <View style={styles.marquee}>
      <MarqueeText
        style={styles.message}
        duration={10000}
        marqueeOnStart
        loop
        marqueeDelay={1250}
        marqueeResetDelay={0}
        useNativeDriver
        >
          {daily}
        </MarqueeText>
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
  marquee: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16
  },
  button: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    margin: 8,
    paddingLeft: 16,
    paddingRight: 16,
  }
});

export default Header;
