import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { handleFbLogin } from './index';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Button
        onPress={handleFbLogin}
        title="Sign in with facebook"
        color="#3c50e8"
      />
      </View>
    );
  }
};

const styles = {
  container: {
    flex: 1
  }
}
