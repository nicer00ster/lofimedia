import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import { Button, ListItem, Divider } from 'react-native-elements';
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
  text: {
    fontSize: 24,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
    color: '#efefef',
    margin: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
        <View>
          <Image style={styles.image} source={{ uri: `${navigation.state.params.photoURL}?width=400` }} />
          {
            !user.following[navigation.state.params.uid]
              ? <Button
                  onPress={() => screenProps.followUser(navigation.state.params, user.uid, navigation.state.params.uid)}
                  medium
                  raised
                  backgroundColor='#1f222e'
                  buttonStyle={{ width: screenWidth, alignSelf: 'center' }}
                  containerViewStyle={{ width: screenWidth, alignSelf: 'center' }}
                  textStyle={{ fontWeight: 'bold' }}
                  icon={{ name: 'user-follow', type: 'simple-line-icon', color: '#fff' }}
                  title='FOLLOW' />
              : <Button
                  onPress={() => screenProps.unfollowUser(navigation.state.params, user.uid, navigation.state.params.uid)}
                  medium
                  raised
                  backgroundColor='#1f222e'
                  buttonStyle={{ width: screenWidth, alignSelf: 'center' }}
                  containerViewStyle={{ width: screenWidth, alignSelf: 'center' }}
                  textStyle={{ fontWeight: 'bold' }}
                  icon={{ name: 'user-unfollow', type: 'simple-line-icon', color: '#fff' }}
                  title='UNFOLLOW' />
              }
              <View style={styles.textContainer}>
                <Text style={styles.text}>Followers: {userlist[navigation.state.params.uid].followers}</Text>
                <Text style={styles.text}>Following: {
                  typeof userlist[navigation.state.params.uid].following === 'object'
                  ? Object.keys(userlist[navigation.state.params.uid].following).length
                  : userlist[navigation.state.params.uid].following
                }
              </Text>
              </View>
          <Divider />
        </View>
          <ScrollView>
            {
              !navigation.state.params.playlist
                ? <Text style={styles.text}>User's playlist is empty.</Text>
                : <React.Fragment>
                  <Text style={styles.text}>{navigation.state.params.displayName}'s Playlist</Text>
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
        {/* <View style={styles.bottomContent}> */}

        {/* </View> */}
      </View>
    );
  }
}

export default SingleUser;
