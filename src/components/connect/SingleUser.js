import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';

const { width } = Dimensions.get('window');
const imageWidth = width;
const imageHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
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
    padding: 10,
  },
  image: {
    borderWidth: 0.5,
    borderRadius: 1,
    elevation: 6,
    width,
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
  text: {
    fontSize: 36,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
    color: '#1f222e',
    margin: 10,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

class SingleUser extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    playlist: PropTypes.object,
    uid: PropTypes.string,
    screenProps: PropTypes.object,
    playlistRemove: PropTypes.func,
    playlistAdd: PropTypes.func,
    remove: PropTypes.func,
    track: PropTypes.object,
    trackID: PropTypes.string,
  }
  render() {
    const { navigation, screenProps } = this.props;
    const { userlist, user } = this.props.screenProps.user;
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: `${navigation.state.params.photoURL}?width=400` }} />
          <Text style={styles.text}>Followers: {navigation.state.params.followers.length}</Text>
          <Text style={styles.text}>Following: {navigation.state.params.following.length}</Text>
        </View>
        <View style={styles.bottomContent}>
          {
            !user.following[navigation.state.params.uid]
            // user.following === 0
              ? <Button
                onPress={() => screenProps.followUser(user.uid, navigation.state.params.uid)}
                medium
                raised
                backgroundColor='#1f222e'
                buttonStyle={{ width }}
                textStyle={{ fontWeight: 'bold' }}
                icon={{ name: 'user-follow', type: 'simple-line-icon', color: '#fff' }}
                title='FOLLOW' />
              : <Button
                onPress={() => screenProps.unfollowUser(user.uid, navigation.state.params.uid)}
                medium
                raised
                backgroundColor='#1f222e'
                buttonStyle={{ width }}
                textStyle={{ fontWeight: 'bold' }}
                icon={{ name: 'user-unfollow', type: 'simple-line-icon', color: '#fff' }}
                title='UNFOLLOW' />
          }
        </View>
      </View>
    );
  }
}

export default SingleUser;
