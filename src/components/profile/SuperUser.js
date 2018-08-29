import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Header,
  Button,
} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f222e',
    justifyContent: 'center',
  },
  header: {
    fontSize: 36,
    color: '#fff',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
  },
});

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
      <View style={styles.container}>
        <Header
          outerContainerStyles={{ borderBottomWidth: 0 }}
          leftComponent={<Text style={styles.header}>Add a track</Text>}
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
