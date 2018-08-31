import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { ListItem, Header } from 'react-native-elements';
import { objToArray } from '../../helpers';
import Container from '../containers/Container';

const { width } = Dimensions.get('window');
const screenWidth = width - 36;
const screenHeight = width - 76;

const styles = StyleSheet.create({
  text: {
    fontSize: 42,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.50)',
  },
  textContainer: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    color: '#fff',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
  },
  listTitle: {
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'HelveticaNeue',
    color: '#fff',
  },
  listSubtitle: {
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'HelveticaNeue',
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
    const { userlist, user } = this.props.screenProps.user;
    const users = !userlist ? [] : objToArray(userlist);
    return (
      <Container
        navigation={this.props.navigation}
        avatar={user.photoURL}
        daily={this.props.screenProps.daily}>
        <Header leftComponent={<Text style={styles.headerText}>Connect</Text>} backgroundColor='transparent' />
        {this.props.screenProps.user.fetching
          ? <Spinner type="9CubeGrid" size={100} color="#fff" style={{ flex: 1, alignSelf: 'center' }}/>
          : <ScrollView>
            <FlatList
              data={users}
              renderItem={({ item }) => (
            <ListItem
              containerStyle={{ width: '100%' }}
              avatar={item.photoURL}
              key={item.uid}
              onPress={() => this.props.navigation.navigate('SingleUser', { ...item })}
              title={item.displayName}
              titleStyle={styles.listTitle}
              subtitle={`Followers: ${item.followers}`}
              subtitleStyle={styles.listSubtitle} />
              )} />
          </ScrollView>}
      </Container>
    );
  }
}
