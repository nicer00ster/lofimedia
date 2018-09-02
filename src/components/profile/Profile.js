import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Button,
  Icon,
  CheckBox,
  Text,
  Card,
} from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import LoginMethods from './LoginMethods';
import Header from '../containers/Header';
import styles from './Profile.styles';

const { width } = Dimensions.get('window');

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
    notifications: false,
  }
  render() {
    const { screenProps } = this.props;
    const followingUser = typeof screenProps.user.user.following === 'object' ? Object.keys(screenProps.user.user.following).length : screenProps.user.user.following

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
              <View style={styles.imageContainer}>
                {screenProps.user.user.photoURL !== '' && <Image style={styles.image} source={{ uri: screenProps.user.user.photoURL }} />}
                <View style={styles.textContainer}>
                  {screenProps.user.user.superuser === true
                    && <Icon
                        raised
                        name='diamond'
                        containerStyle={{ backgroundColor: 'rgb(31, 34, 46)' }}
                        underlayColor='rgba(31, 34, 46, 0.5)'
                        color='rgb(255, 226, 77)'
                        type='simple-line-icon'
                        onPress={() => this.props.navigation.navigate('SuperUser')} />}
                  <Text style={styles.name}>{screenProps.user.user.displayName}</Text>
                  <Text style={styles.text}>{screenProps.user.user.email}</Text>
                  <Text style={styles.text}>Followers: {screenProps.user.user.followers}</Text>
                  <Text style={styles.text}>Following: {followingUser}</Text>
                </View>
              </View>
              <Card containerStyle={styles.info}>
                <View style={{ flexDirection: 'row', marginBottom: 10, alignSelf: 'center' }}>
                  <CheckBox
                    title='Notifications'
                    checked={screenProps.user.user.notifications}
                    checkedIcon='check'
                    containerStyle={{ backgroundColor: '#1f222e', borderWidth: 0 }}
                    textStyle={{ color: '#fff' }}
                    checkedColor='#fff'
                    onPress={() => screenProps.toggleNotifications(screenProps.user.user.uid, screenProps.user.user.notifications)}
                  />
                  <CheckBox
                    title='Superuser'
                    checked={screenProps.user.user.superuser}
                    checkedIcon='check'
                    disabled
                    containerStyle={{ backgroundColor: '#1f222e', borderWidth: 0 }}
                    textStyle={{ color: screenProps.user.user.superuser ? '#fff' : '#8a8989' }}
                    checkedColor='#fff'
                  />
                </View>
                <Button
                  onPress={() => alert('You\'re request has been sent')}
                  loading={this.props.screenProps.user.fetching}
                  backgroundColor='#1f222e'
                  small
                  raised
                  containerViewStyle={{ margin: 5 }}
                  textStyle={{ fontWeight: 'bold' }}
                  icon={{ name: 'diamond', type: 'simple-line-icon', color: 'rgb(255, 226, 77)' }}
                  title='Request to upload' />
                <Button
                  onPress={() => this.props.navigation.navigate('Playlist')}
                  backgroundColor='#1f222e'
                  small
                  raised
                  containerViewStyle={{ margin: 5 }}
                  textStyle={{ fontWeight: 'bold' }}
                  icon={{ name: 'playlist', type: 'simple-line-icon', color: 'rgb(77, 164, 255)' }}
                  title='View Playlist' />
              </Card>
              <View style={styles.bottomContent}>
                <Button
                  onPress={() => screenProps.onfbLogout()}
                  medium
                  raised
                  backgroundColor='#1f222e'
                  containerViewStyle={{ width }}
                  textStyle={{ fontWeight: 'bold' }}
                  icon={{ name: 'logout', type: 'simple-line-icon' }}
                  title='LOGOUT' />
              </View>
            </React.Fragment>
          }
      </View>
    );
  }
}
