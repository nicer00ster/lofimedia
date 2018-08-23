import React from 'react';
import { Text } from 'react-native';
import Container from './Container';

export default class Playlist extends React.PureComponent {
  render() {
    return (
      <Container navigation={this.props.navigation} avatar={this.props.screenProps.user.user.photoURL} daily={this.props.screenProps.daily}>
        <Text>Playlist</Text>
      </Container>
    )
  };
};
