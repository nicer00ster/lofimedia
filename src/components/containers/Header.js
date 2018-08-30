import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import MarqueeText from 'react-native-marquee';

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marquee: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    margin: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

class Header extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func,
      navigate: PropTypes.func,
    }),
    daily: PropTypes.string,
    avatar: PropTypes.string,
  }
  render() {
    const { daily } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.navigation.openDrawer} style={{ paddingLeft: 6 }}>
          <Icon style={styles.button} size={32} type="simple-line-icon" name="menu" color="white"/>
        </TouchableOpacity>
        <View style={styles.marquee}>
          <MarqueeText
            style={styles.message}
            duration={10000}
            marqueeOnStart
            loop
            marqueeDelay={1250}
            marqueeResetDelay={0}
            useNativeDriver>
            {daily}
          </MarqueeText>
        </View>
        <Avatar
          rounded
          source={{ uri: this.props.avatar }}
          onPress={() => this.props.navigation.navigate('Profile')}
          width={42}
          height={42}
          activeOpacity={0.75}
          containerStyle={{ marginBottom: 25 }}/>
      </View>
    );
  }
}

export default Header;
