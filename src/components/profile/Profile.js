import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text, StatusBar, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../../config/db';
import Spinner from 'react-native-spinkit';
import LoginMethods from './LoginMethods';
import Header from '../Header';

export default class Profile extends React.Component {
  state = {
    artist: '',
    title: '',
    mp3url: '',
    photoURL: ''
  }
  render() {
    const { screenProps } = this.props;
    if(screenProps.user.fetching) {
      return <Spinner type="9CubeGrid" size={100} color="#1f222e" style={{ flex: 1, alignSelf: 'center' }}/>
    }
    if(!screenProps.user.user.authenticated) {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Header navigation={this.props.navigation} avatar={screenProps.user.user.photoURL} daily={screenProps.daily} />
          <LoginMethods onfbLogin={screenProps.onfbLogin} />
        </View>
        );
      } else {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Header navigation={this.props.navigation} avatar={screenProps.user.user.photoURL} daily={screenProps.daily} />
          <View>
            {screenProps.user.user.photoURL !== '' && <Image style={styles.image} source={{ uri: screenProps.user.user.photoURL }} />}
            <View style={styles.textContainer}>
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
              containerViewStyle={{ width: width }}
              textStyle={styles.text}
              icon={{ name: 'logout', type: 'simple-line-icon' }}
              title='LOGOUT' />
          </View>
        </View>
      );
    };
  };
};

const { width, height } = Dimensions.get('window');
const imageWidth = width - 8;
const imageHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(31, 34, 46, 0.75)'
  },
  image: {
    borderWidth: .5,
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
    margin: 12
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
    alignItems: 'flex-end'
  },
})
