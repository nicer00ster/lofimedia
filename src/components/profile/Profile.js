import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { fbLogout } from '../../auth/index';
import { SocialIcon, Button } from 'react-native-elements';
import { checkObject } from '../../helpers'
import Spinner from 'react-native-spinkit';
import LoginMethods from './LoginMethods';


export default class Profile extends React.Component {
  render() {
    if(this.props.screenProps.user.fetching) {
      return <Spinner type="9CubeGrid" size={100} color="#1f222e" style={{ flex: 1, alignSelf: 'center' }}/>
    }
    if(!this.props.screenProps.user.user.authenticated) {
      return (
        <View style={styles.container}>
          <LoginMethods onfbLogin={this.props.screenProps.onfbLogin} />
        </View>
        );
      } else {
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
          {
            this.props.screenProps.user.user.photoURL !== '' && <Image style={styles.image} source={{ uri: this.props.screenProps.user.user.photoURL }} />
          }
            <View style={styles.imageText}>
              <Text style={styles.nameText}>{this.props.screenProps.user.user.displayName}</Text>
              <Text style={styles.text}>{this.props.screenProps.user.user.email}</Text>
            </View>

          </View>
            <Button
              onPress={() => this.props.screenProps.onfbLogout()}
              medium
              raised
              backgroundColor='#1f222e'
              containerViewStyle={{ width: imageWidth }}
              textStyle={styles.text}
              icon={{ name: 'logout', type: 'simple-line-icon' }}
              title='LOGOUT' />
        </View>
      );
    };
  };
};

const { width, height } = Dimensions.get('window');
const imageWidth = width;
const imageHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageContainer: {
    // alignSelf: 'flex-start'
  },
  image: {
    borderWidth: .5,
    borderRadius: 1,
    width: imageWidth,
    height: imageHeight,
  },
  imageText: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 12
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  }
})
