import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default class PlaylistItems extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Icon iconStyle={styles.icon} onPress={() => this.props.remove(this.props.uid, this.props.trackID)} type='font-awesome' name='heart' color='rgb(255, 135, 135)' />
        <Icon iconStyle={styles.icon} type='font-awesome' name='share-alt' color='#fff' />
        <Icon iconStyle={styles.icon} type='font-awesome' name='play-circle' color='#fff' />
        <Icon iconStyle={styles.icon} type="simple-line-icon" name="options" color="white" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10
  }
});
