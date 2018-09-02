import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  Button,
  ListItem,
  Divider,
  Text,
} from 'react-native-elements';
import { objToArray } from '../../helpers';
import styles from './SingleUser.styles';

const { width } = Dimensions.get('window');

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
