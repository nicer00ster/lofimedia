import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import ViewOverflow from 'react-native-view-overflow';
import AddButton from './AddButton';

const styles = StyleSheet.create({
  tabbar: {
    height: 49,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#fff',
    backgroundColor: '#1f222e',
  },
  tab: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    alignSelf: 'center',
    flex: 1,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Courier New',
  },
});

class TabBar extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    renderIcon: PropTypes.func,
    activeTintColor: PropTypes.string,
    inactiveTintColor: PropTypes.string,
  }
  render() {
    const {
      navigation,
      renderIcon,
      activeTintColor,
      inactiveTintColor,
    } = this.props;
    const { routes } = navigation.state;
    return (
      <ViewOverflow style={styles.tabbar}>
        {routes && routes.map((route, index) => {
          const focused = index === navigation.state.index;
          const tintColor = focused ? activeTintColor : inactiveTintColor;
          return (
            <TouchableWithoutFeedback
              key={route.key}
              style={styles.tab}
              onPress={() => navigation.navigate(route.routeName)}>
                <ViewOverflow style={styles.tab}>
                  {focused ? <Text style={styles.label}>{route.routeName}</Text> : null}
                  {renderIcon({
                    route,
                    index,
                    focused,
                    tintColor,
                  })}
                </ViewOverflow>
              </TouchableWithoutFeedback>
          );
        })}
      </ViewOverflow>
    );
  }
}

export default TabBar;
