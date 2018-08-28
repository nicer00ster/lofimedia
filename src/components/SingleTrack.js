import React from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import Database from '../config/db';

class SingleTrack extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    const { playlist, uid } = this.props.screenProps.user.user;
    let toggleHeart = playlist === null ? '#1f222e' : playlist[navigation.state.params.uid] ? 'rgb(255,135,136)' : '#1f222e';
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: navigation.state.params.photoURL }} />
          <View style={[styles.imageText, styles.overlay]}>
            <Text style={styles.title}>{navigation.state.params.title}</Text>
            <Text style={styles.artist}>{navigation.state.params.artist}</Text>
          </View>
          <View style={styles.play}>
            <Icon type="font-awesome" size={125} name="play-circle" color='#fff'/>
          </View>
          <View style={styles.add}>
            <Icon
              type="font-awesome"
              name="heart"
              size={50}
              color={toggleHeart}
              // containerStyle={{ backgroundColor: toggleHeart }}
              // raised
              onPress={() =>
                playlist[navigation.state.params.uid]
                ? this.props.screenProps.playlistRemove(navigation.state.params, uid, navigation.state.params.uid)
                : this.props.screenProps.playlistAdd(navigation.state.params, uid, navigation.state.params.uid)} />
              <Badge
                containerStyle={{ backgroundColor: 'rgba(31, 34, 46, 0.25)', height: 25, width: 25, padding: 5, marginLeft: 15 }}
                wrapperStyle={styles.heartContainer}
                textStyle={styles.heartText}
                onPress={() => this.props.remove(this.props.track, this.props.uid, this.props.trackID)}
                value={this.props.screenProps.tracks.tracks[navigation.state.params.uid].hearts} />
          </View>
        </View>
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
  add: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    position: 'absolute',
    padding: 10
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
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    padding: 12,
    margin: 6
  },
  artist: {
    fontSize: 20,
    color: '#fff',
    padding: 12,
    margin: 6
  },
  heartContainer: {
    position: 'absolute',
    paddingBottom: 5,
  },
  heartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  }
})

export default SingleTrack;
