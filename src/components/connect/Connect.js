import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import {
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import { ListItem, Header } from 'react-native-elements';
import { objToArray } from '../../helpers';
import Container from '../containers/Container';
import styles from './Connect.styles';

export default class Connect extends React.PureComponent {
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
