import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import {
  FormLabel,
  FormInput,
  // FormValidationMessage,
  Header,
  Button,
} from 'react-native-elements';

class SuperUser extends React.Component {
  static propTypes = {
    screenProps: PropTypes.shape({
      addTrack: PropTypes.func,
      tracks: PropTypes.shape({
        fetching: PropTypes.bool,
      }),
    }),
  }
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      title: '',
      mp3url: '',
      photoURL: '',
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#1f222e', justifyContent: 'center' }}>
        <Header
          outerContainerStyles={{ borderBottomWidth: 0 }}
          leftComponent={<Text style={{ fontSize: 36, color: '#fff', fontFamily: 'sans-serif-thin' }}>Add a track</Text>}
          backgroundColor='transparent' />
        <FormLabel>Artist</FormLabel>
        <FormInput onChangeText={artist => this.setState({ artist })} />
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={title => this.setState({ title })}/>
        <FormLabel>MP3 URL</FormLabel>
        <FormInput onChangeText={mp3url => this.setState({ mp3url })}/>
        <FormLabel>Photo URL</FormLabel>
        <FormInput onChangeText={photoURL => this.setState({ photoURL })}/>
        <Button
          onPress={() => this.props.screenProps.addTrack(this.state)}
          title='ADD'
          raised
          rightIcon={{ name: 'plus-circle', type: 'font-awesome' }}
          loading={this.props.screenProps.tracks.fetching}
          buttonStyle={{ alignSelf: 'center', width: 200 }}
          containerViewStyle={{ alignSelf: 'center' }}/>
      </View>
    );
  }
}

export default SuperUser;
