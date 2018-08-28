import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { ListItem, Header } from 'react-native-elements';
import { objToArray } from '../../helpers';
import Container from '../Container';
import PlaylistItems from './PlaylistItems';

const { width } = Dimensions.get('window');
const screenWidth = width - 36;
const screenHeight = width - 76;

const styles = StyleSheet.create({
  text: {
    fontSize: 52,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'Courier New',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    height: '75%',
    color: 'rgba(255, 255, 255, 0.50)',
  },
  headerText: {
    fontSize: 36,
    color: '#fff',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'Courier New',
  },
});

export default class Playlist extends React.PureComponent {
  static propTypes = {
    screenProps: PropTypes.object,
    user: PropTypes.object,
    navigation: PropTypes.object,
    daily: PropTypes.string,
    tracks: PropTypes.object,
    playlistRemove: PropTypes.func,
  }

  render() {
    const { user } = this.props.screenProps.user;
    const playlist = !user.playlist ? [] : objToArray(user.playlist);
    return (
      <Container
        navigation={this.props.navigation}
        avatar={user.photoURL}
        daily={this.props.screenProps.daily}>
        <Header leftComponent={<Text style={styles.headerText}>Playlist</Text>} backgroundColor='transparent' />
        {playlist.length === 0
          ? <View style={{ width: screenWidth, height: screenHeight }}>
              <Text style={styles.text}>Your playlist is empty.</Text>
            </View>
          : null}
        {!playlist
          ? <Spinner type="9CubeGrid" size={100} color="#fff" style={{ flex: 1, alignSelf: 'center' }}/>
          : <ScrollView>
            <FlatList
              data={playlist}
              renderItem={({ item }) => (
            <ListItem
              containerStyle={{ width: '100%' }}
              avatar={item.photoURL}
              key={item.uid}
              onPress={() => this.props.navigation.navigate('Single', { ...item })}
              rightIcon={
                <PlaylistItems
                key={item.uid}
                uid={user.uid}
                hearts={this.props.screenProps.tracks.tracks[item.uid].hearts}
                track={item}
                trackID={item.uid}
                remove={this.props.screenProps.playlistRemove} />}
              titleStyle={{ color: 'white' }}
              title={item.title}
              subtitle={item.artist} />
              )}
            />
          </ScrollView>}
      </Container>
    );
  }
}
