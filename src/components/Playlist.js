import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import Header from './Header';

class Playlist extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/img/cover.jpg')}
          style={styles.background}
          resizeMode="cover"
          opacity={.25}
        />
        <Header navigation={this.props.navigation} avatar={this.props.screenProps.user.user.photoURL} daily={this.props.screenProps.daily} />
        <Text>Playlist</Text>
      </View>
    )
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
  },
})


export default Playlist;
