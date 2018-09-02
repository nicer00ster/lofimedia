import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Button,
  ListItem,
  Divider,
  Text,
} from 'react-native-elements';
import { objToArray } from '../../helpers';

const { width } = Dimensions.get('window');
const screenWidth = width - 76;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width,
    backgroundColor: '#1f222e',
  },
  image: {
    borderWidth: 0.5,
    borderRadius: 1,
    elevation: 6,
    width,
    height: screenWidth,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  imageContainer: {
    ...Platform.select({
      ios: {
        padding: 2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#000',
        shadowOpacity: 0.85,
      },
      android: {
        padding: 2,
      },
    }),
  },
  text: {
    fontSize: 24,
    color: '#efefef',
    margin: 5,
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 6,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  divider: {
    height: 1,
    backgroundColor: '#efefef',
  },
});

class SingleUser extends React.PureComponent {
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
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: `${navigation.state.params.photoURL}?width=400` }} />
            <View style={[styles.textContainer, styles.overlay]}>
              <Text style={[styles.text, { alignSelf: 'flex-start', marginLeft: 12 }]}>Followers: {userlist[navigation.state.params.uid].followers}</Text>
              <Text style={[styles.text, { alignSelf: 'flex-start', marginLeft: 12 }]}>Following: {
                typeof userlist[navigation.state.params.uid].following === 'object'
                  ? Object.keys(userlist[navigation.state.params.uid].following).length
                  : userlist[navigation.state.params.uid].following
              }
              </Text>
              <View>
                {
                  !user.following[navigation.state.params.uid]
                  ? <Button
                    onPress={() => screenProps.followUser(navigation.state.params, user.uid, navigation.state.params.uid)}
                    backgroundColor='rgba(31, 34, 46, 0.75)'
                    buttonStyle={{ width }}
                    containerViewStyle={{ width }}
                    textStyle={{ fontWeight: 'bold' }}
                    icon={{ name: 'user-follow', type: 'simple-line-icon', color: '#fff' }}
                    title='FOLLOW' />
                  : <Button
                    onPress={() => screenProps.unfollowUser(navigation.state.params, user.uid, navigation.state.params.uid)}
                    backgroundColor='rgba(31, 34, 46, 0.75)'
                    buttonStyle={{ width }}
                    containerViewStyle={{ width }}
                    textStyle={{ fontWeight: 'bold' }}
                    icon={{ name: 'user-unfollow', type: 'simple-line-icon', color: '#fff' }}
                    title='UNFOLLOW' />
                  }
                  </View>
            </View>
          </View>
          <ScrollView>
            {
              !navigation.state.params.playlist
                ? <Text style={styles.text}>User's playlist is empty.</Text>
                : <React.Fragment>
                  <Text style={styles.text}>{navigation.state.params.displayName}'s Playlist</Text>
                  <Divider />
                    <FlatList
                      data={objToArray(navigation.state.params.playlist)}
                      renderItem={({ item }) => (
                    <ListItem
                      onPress={() => this.props.navigation.navigate('SingleTrack', { ...item })}
                      containerStyle={{ width }}
                      avatar={item.photoURL}
                      rightIcon={{ name: 'playlist-add' }}
                      titleStyle={{ color: 'white' }}
                      title={item.title}
                      subtitle={item.artist} />
                      )} />
                  </React.Fragment>
            }
          </ScrollView>
      </View>
    );
  }
}

export default SingleUser;
