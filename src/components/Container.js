import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
} from 'react-native';
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f222e',
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});

export default class Container extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.object,
    avatar: PropTypes.string,
    daily: PropTypes.string,
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/img/cover.jpg')}
          style={styles.background}
          resizeMode="cover"
          opacity={0.25}
        />
        <Header
          navigation={this.props.navigation}
          avatar={this.props.avatar}
          daily={this.props.daily} />
        <StatusBar hidden={true} />
        {this.props.children}
      </View>
    );
  }
}
