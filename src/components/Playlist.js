import React from 'react';
import Spinner from 'react-native-spinkit';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { objToArray } from '../helpers';
import Container from './Container';
import Database from '../config/db';

export default class Playlist extends React.Component {
  componentDidMount() {
    this.props.screenProps.fetchPlaylist(this.props.screenProps.user.user.uid);
  }
  render() {
    let playlist = !this.props.screenProps.user.user.playlist ? [] : objToArray(this.props.screenProps.user.user.playlist)
    return (
      <Container navigation={this.props.navigation} avatar={this.props.screenProps.user.user.photoURL} daily={this.props.screenProps.daily}>
        {this.props.screenProps.user.fetching
        ? <Spinner type="9CubeGrid" size={100} color="#fff" style={{ flex: 1, alignSelf: 'center' }}/>
        : <ScrollView>
            <FlatList
              data={playlist}
              renderItem={({ item }) =>
            <ListItem
              containerStyle={{ width: '100%' }}
              avatar={item.photoURL}
              rightIcon={{ name: 'playlist-add' }}
              titleStyle={{ color: 'white' }}
              title={item.title}
              subtitle={item.artist} />}
            />
          </ScrollView>}
      </Container>
    )
  };
};
