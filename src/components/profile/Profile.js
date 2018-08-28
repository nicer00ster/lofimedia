import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  StatusBar,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import LoginMethods from './LoginMethods';
import Header from '../Header';

const { width } = Dimensions.get('window');
const imageWidth = width - 8;
const imageHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(31, 34, 46, 0.75)',
  },
  image: {
    borderWidth: 1,
    borderRadius: 1,
    width: imageWidth,
    height: imageHeight,
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default class Profile extends React.Component {
  static propTypes = {
    screenProps: PropTypes.object,
    user: PropTypes.object,
    authenticated: PropTypes.bool,
    navigation: PropTypes.object,
    photoURL: PropTypes.string,
    daily: PropTypes.string,
    onfbLogin: PropTypes.func,
  }
  state = {
    artist: '',
    title: '',
    mp3url: '',
    photoURL: '',
  }
  render() {
    const { screenProps } = this.props;

    if (!screenProps.user.user.authenticated) {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Header
            navigation={this.props.navigation}
            avatar={screenProps.user.user.photoURL}
            daily={screenProps.daily} />
          <LoginMethods onfbLogin={screenProps.onfbLogin} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header
          navigation={this.props.navigation}
          avatar={screenProps.user.user.photoURL}
          daily={screenProps.daily} />
          {screenProps.user.fetching ? <Spinner type="9CubeGrid" size={100} color="#fff" style={{ flex: 1, alignSelf: 'center' }}/>
            : <React.Fragment>
              <View>
                {screenProps.user.user.photoURL !== '' && <Image style={styles.image} source={{ uri: screenProps.user.user.photoURL }} />}
                <View style={styles.textContainer}>
                  {screenProps.user.user.superuser === true && <Icon raised name='diamond' type='simple-line-icon' onPress={() => this.props.navigation.navigate('SuperUser')} />}
                  <Text style={styles.name}>{screenProps.user.user.displayName}</Text>
                  <Text style={styles.text}>{screenProps.user.user.email}</Text>
                </View>
              </View>
              <View style={styles.bottomContent}>
                <Button
                  onPress={() => screenProps.onfbLogout()}
                  medium
                  raised
                  backgroundColor='#1f222e'
                  containerViewStyle={{ width }}
                  textStyle={styles.text}
                  icon={{ name: 'logout', type: 'simple-line-icon' }}
                  title='LOGOUT' />
              </View>
            </React.Fragment>
          }
      </View>
    );
  }
}
