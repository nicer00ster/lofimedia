import React from 'react';
import Spinner from 'react-native-spinkit';
import { StyleSheet, View, Text, FlatList, ScrollView, Platform } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { objToArray } from '../../helpers';
import Container from '../Container';
import PlaylistItems from './PlaylistItems';
import Database from '../../config/db';

export default class Playlist extends React.PureComponent {
  render() {
    const { user } = this.props.screenProps.user;
    let playlist = !user.playlist ? [] : objToArray(user.playlist)
    return (
      <Container navigation={this.props.navigation} avatar={user.photoURL} daily={this.props.screenProps.daily}>
        {user.fetching
        ? <Spinner type="9CubeGrid" size={100} color="#fff" style={{ flex: 1, alignSelf: 'center' }}/>
        : <ScrollView>
            <FlatList
              data={playlist}
              renderItem={({ item }) =>
            <ListItem
              containerStyle={{ width: '100%' }}
              avatar={item.photoURL}
              key={item.uid}
              rightIcon={<PlaylistItems uid={user.uid} trackID={item.uid} remove={this.props.screenProps.playlistRemove} />}
              titleStyle={{ color: 'white' }}
              title={item.title}
              subtitle={item.artist} />}
            />
          </ScrollView>}
      </Container>
    )
  };
};

const styles = StyleSheet.create({
  text: {
    fontSize: 52,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'Courier New',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    height: '50%',
    color: 'rgba(255, 255, 255, 0.50)',
  },
});
