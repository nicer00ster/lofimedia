import React from 'react';
import { Text } from 'react-native';
import Container from './Container';
import { Button } from 'react-native-elements';
import Database from '../config/db';

export default class Playlist extends React.PureComponent {
  render() {
    return (
      <Container navigation={this.props.navigation} avatar={this.props.screenProps.user.user.photoURL} daily={this.props.screenProps.daily}>
        <Text>Playlist</Text>
        <Button
          onPress={() => Database.getMarquee()}
          medium
          raised
          backgroundColor='#1f222e'
          icon={{ name: 'logout', type: 'simple-line-icon' }}
          title='LOGOUT' />
      </Container>
    )
  };
};
