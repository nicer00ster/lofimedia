import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { onfbLogin } from '../../actions/index';

const LoginMethods = props => (
  <View style={styles.container}>
      <Button
        onPress={() => props.onfbLogin()}
        medium
        raised
        textStyle={styles.text}
        backgroundColor='#3b5998'
        icon={{ name: 'social-facebook', type: 'simple-line-icon' }}
        title='LOGIN WITH FACEBOOK' />
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  }
})

export default LoginMethods;
