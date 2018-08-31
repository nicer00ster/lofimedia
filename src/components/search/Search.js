import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Icon,
  SearchBar,
  ListItem,
  Header,
} from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import Container from '../containers/Container';

const { width } = Dimensions.get('window');
const screenWidth = width - 36;
const screenHeight = width - 76;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 42,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    color: 'rgba(255, 255, 255, 0.50)',
  },
  searchInput: {
    width: screenWidth,
    backgroundColor: 'rgba(31, 34, 46, 0.5)',
  },
  searchContainer: {
    alignSelf: 'center',
    borderRadius: 2,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: 'rgba(31, 34, 46, 0.25)',
  },
  header: {
    fontSize: 36,
    color: '#fff',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
  },
});

export default class Search extends React.Component {
  static propTypes = {
    screenProps: PropTypes.shape({
      search: PropTypes.string,
      user: PropTypes.object,
      searchMusic: PropTypes.func,
    }),
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }
  state = { query: '' };
  renderLoading() {
    return <Spinner type="9CubeGrid" size={100} color="white" style={{ alignSelf: 'center' }}/>
  }
  renderItems() {
    if (!this.props.screenProps.search.results || this.props.screenProps.search.results.length === 0) {
      return (
        <View style={{ width: screenWidth, height: screenHeight }}>
          <Text style={styles.text}>Search for a song.</Text>
          <Icon name="search" size={225} color='rgba(255, 255, 255, 0.5)' />
        </View>
      );
    }
    return (
      <ScrollView>
        <FlatList
          data={this.props.screenProps.search.results}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => this.props.navigation.navigate('Single', { ...item })}
              containerStyle={{ width: screenWidth }}
              avatar={item.photoURL}
              rightIcon={{ name: 'playlist-add' }}
              titleStyle={{ color: 'white' }}
              title={item.title}
              subtitle={item.artist} />
          )}
        />
      </ScrollView>
    );
  }
  render() {
    const { screenProps } = this.props;
    return (
      <Container
        navigation={this.props.navigation}
        avatar={screenProps.user.user.photoURL}
        daily={screenProps.daily}>
        <Header
          outerContainerStyles={{ borderBottomWidth: 0 }}
          leftComponent={<Text style={styles.header}>Search</Text>}
          backgroundColor='transparent' />
        <SearchBar
          ref={ref => this.search = ref}
          value={this.state.query}
          onChangeText={search => this.setState({ query: search })}
          onSubmitEditing={() => screenProps.searchMusic(this.state.query, screenProps.tracks.tracks)}
          onEndEditing={() => this.search.clearText()}
          inputStyle={styles.searchInput}
          containerStyle={styles.searchContainer}
          showLoadingIcon={screenProps.search.searching}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Search...' />
        <View style={styles.content}>
        {screenProps.search.searching
          ? this.renderLoading()
          : this.renderItems()}
        </View>
      </Container>
    );
  }
}
