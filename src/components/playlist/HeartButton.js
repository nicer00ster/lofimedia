import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Badge, Icon } from 'react-native-elements';

class HeartButton extends React.PureComponent {
  render() {
    return (
      <View style={styles.heart}>
        <Icon onPress={() => this.props.remove(this.props.track, this.props.uid, this.props.trackID)} iconStyle={styles.icon} raised size={15} type='font-awesome' name='heart' color='rgb(255, 135, 135)' />
        <Badge
          containerStyle={{ backgroundColor: 'rgba(31, 34, 46, 0.5)', height: 12.5, width: 35 }}
          wrapperStyle={styles.heartContainer}
          textStyle={styles.heartText}
          onPress={() => this.props.remove(this.props.track, this.props.uid, this.props.trackID)}
          value={this.props.hearts} />
        </View>
    );
  };
};
