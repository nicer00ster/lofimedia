import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});

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

LoginMethods.propTypes = {
  onfbLogin: PropTypes.func,
};


export default LoginMethods;
