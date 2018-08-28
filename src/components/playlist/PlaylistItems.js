import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Icon, Badge } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  heart: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heartContainer: {
    position: 'absolute',
    paddingBottom: 5,
  },
  heartText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default class PlaylistItems extends React.PureComponent {
  static propTypes = {
    remove: PropTypes.func,
    track: PropTypes.object,
    uid: PropTypes.string,
    trackID: PropTypes.string,
    hearts: PropTypes.number,
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heart}>
          <Icon onPress={() => this.props.remove(this.props.track, this.props.uid, this.props.trackID)} iconStyle={styles.icon} size={32.5} type='font-awesome' name='heart' color='rgb(255, 135, 135)' />
          <Badge
            containerStyle={{ backgroundColor: 'rgba(31, 34, 46, 0.25)', height: 20, width: 20, padding: 2 }}
            wrapperStyle={styles.heartContainer}
            textStyle={styles.heartText}
            onPress={() => this.props.remove(this.props.track, this.props.uid, this.props.trackID)}
            value={this.props.hearts} />
        </View>
        <Icon iconStyle={styles.icon} type='font-awesome' name='share-alt' color='#fff' />
        <Icon iconStyle={styles.icon} type='font-awesome' name='play-circle' color='#fff' />
        <Icon iconStyle={styles.icon} type="simple-line-icon" name="options" color="white" />
      </View>
    );
  }
}
