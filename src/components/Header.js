import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import MarqueeText from 'react-native-marquee';

class Header extends React.PureComponent {
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
          <Avatar
            rounded
            source={{ uri: this.props.avatar }}
            onPress={() => this.props.navigation.navigate('Profile')}
            activeOpacity={0.75}
            containerStyle={{ marginBottom: 25 }}
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
            {this.props.daily}
            </MarqueeText>
          </View>
          <TouchableOpacity onPress={this.props.navigation.openDrawer}>
            <Icon style={styles.button} type="simple-line-icon" name="menu" color="white"/>
          </TouchableOpacity>
        </View>
    );
  };
};

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