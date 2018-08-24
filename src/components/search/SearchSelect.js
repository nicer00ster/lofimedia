import React from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Database from '../../config/db';

class SearchSelect extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: this.props.navigation.state.params.photoURL }} />
          <View style={[styles.imageText, styles.overlay]}>
            <Text style={styles.title}>{this.props.navigation.state.params.title}</Text>
            <Text style={styles.artist}>{this.props.navigation.state.params.artist}</Text>
          </View>
          <View style={styles.play}>
            <Icon type="font-awesome" size={125} name="play-circle" color='#fff'/>
          </View>
        </View>
        <Icon onPress={() => Database.addToPlaylist(this.props.navigation.state.params, this.props.screenProps.user.user.uid, this.props.navigation.state.params.uid)} name="add"/>
      </View>
    );
  };
};

const { width, height } = Dimensions.get('window');
const imageWidth = width;
const imageHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'rgba(0, 0, 0, 0.35)'
  },
  play: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  image: {
    borderWidth: .5,
    borderRadius: 1,
    width: imageWidth,
    height: imageHeight,
  },
  imageText: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: '#fff',
    padding: 12,
  },
  artist: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#fff',
    padding: 12
  }
})

export default SearchSelect;
