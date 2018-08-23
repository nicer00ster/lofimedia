import React from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import Header from './Header';

export default class Container extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/img/cover.jpg')}
          style={styles.background}
          resizeMode="cover"
          opacity={.25}
        />
        <Header navigation={this.props.navigation} avatar={this.props.avatar} daily={this.props.daily} />
        <StatusBar hidden={true} />
        {this.props.children}
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f222e',
  },
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  }
})
