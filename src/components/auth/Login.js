import React from 'react';
import { StyleSheet, View } from 'react-native';
import { fbLogin } from './index';
// import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { SocialIcon, Button } from 'react-native-elements';
import { checkObject } from '../../helpers'

export default class Login extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <SocialIcon
          onPress={() => fbLogin()}
          disabled={checkObject(this.props.screenProps.user) ? false : true}
          type='facebook'
        />
        <SocialIcon
          onPress={() => fbLogin()}
          disabled={checkObject(this.props.screenProps.user) ? false : true}
          type='twitter'
        />
        <SocialIcon
          onPress={() => fbLogin()}
          disabled={checkObject(this.props.screenProps.user) ? false : true}
          type='github'
        />
        <SocialIcon
          onPress={() => fbLogin()}
          disabled={checkObject(this.props.screenProps.user) ? false : true}
          type='google-plus-official'
        />
        <Button
          large
          raised
          icon={{name: 'squirrel', type: 'octicon' }}
          title='OCTICON' />
      </View>
    );
  }
};
