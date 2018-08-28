import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import ViewOverflow from 'react-native-view-overflow';

const SIZE = 80;
const durationIn = 300;
const durationOut = 200;

const AnimatedViewOverflow = Animated.createAnimatedComponent(ViewOverflow);

class AddButton extends Component {
    mode = new Animated.Value(0);
    icon1 = new Animated.Value(0);
    icon2 = new Animated.Value(0);
    icon3 = new Animated.Value(0);
    toggleView = () => {
      if (this.mode._value) {
        Animated.parallel(
          [this.mode, this.icon1, this.icon2, this.icon3].map(item => Animated.timing(item, {
            toValue: 0,
            duration: durationIn,
            easing: Easing.cubic,
          })),
        ).start();
      } else {
        Animated.parallel([
          Animated.timing(this.mode, {
            toValue: 1,
            duration: durationOut,
            easing: Easing.cubic,
          }),
          Animated.sequence([
            ...[this.icon1, this.icon2, this.icon3].map(item => Animated.timing(item, {
              toValue: 1,
              duration: durationOut,
              easing: Easing.elastic(1),
            })),
          ]),
        ]).start();
      }
    };
    transform = (x, y, z) => [
      { translateX: x },
      { translateY: y },
      { scaleX: z },
      { scaleY: z },
    ];
    render() {
      const firstX = this.icon1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -50],
      });
      const firstY = this.icon1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -50],
      });
      const firstZ = this.icon1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });
      const secondX = this.icon2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0],
      });
      const secondY = this.icon2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -70],
      });
      const secondZ = this.icon2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });
      const thirdX = this.icon3.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 50],
      });
      const thirdY = this.icon3.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -50],
      });
      const thirdZ = this.icon3.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });
      const rotation = this.mode.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
      });

      return (
        <ViewOverflow style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 18 }}>
              <SubAddButton
                  style={{ transform: this.transform(firstX, firstY, firstZ) }}
                  icon="rocket"
              />
              <SubAddButton
                  style={{ transform: this.transform(secondX, secondY, secondZ) }}
                  icon="home"
              />
              <SubAddButton
                  style={{ transform: this.transform(thirdX, thirdY, thirdZ) }}
                  icon="archive"
              />
              <AnimatedViewOverflow style={{ transform: [{ rotate: rotation }] }}>
              <TouchableWithoutFeedback
                    onPress={this.toggleView}
                    activeOpacity={1}>
                    <View style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: SIZE,
                      height: SIZE,
                      borderRadius: SIZE / 2,
                      backgroundColor: '#1f222e',
                    }}>
                    <Icon name='plus' type='simple-line-icon' size={42} color="#F8F8F8"/>
                  </View>
                </TouchableWithoutFeedback>
            </AnimatedViewOverflow>
        </ViewOverflow>
      );
    }
}

class SubAddButton extends Component {
  render() {
    const {
      style,
      icon,
      onPress,
    } = this.props;
    return (
      <AnimatedViewOverflow style={{ position: 'absolute', width: SIZE / 2, height: SIZE / 2, ...style }}>
          <TouchableOpacity
              onPress={() => onPress && onPress()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: SIZE / 2,
                height: SIZE / 2,
                borderRadius: SIZE / 4,
                backgroundColor: '#48A2F8',
              }}>
              <Icon name={icon} size={24} color="#F8F8F8"/>
          </TouchableOpacity>
      </AnimatedViewOverflow>
    );
  }
}

SubAddButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

export default AddButton;
