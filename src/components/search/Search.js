import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, FlatList, ScrollView, Platform } from 'react-native';
import { Icon, SearchBar, ListItem } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import Header from '../Header';
import { filterArrayOfObjects } from '../../helpers';

export default class Search extends React.Component {
  state = {
    query: '',
  };

  renderLoading() {
    return <Spinner type="9CubeGrid" size={100} color="white" style={{ flex: 1, alignSelf: 'center' }}/>
  };

  renderItems() {
    if(!this.props.screenProps.search.results || this.props.screenProps.search.results.length === 0) {
      return (
        <View style={{ width: screenWidth, height: screenHeight }}>
          <Text style={styles.text}>Search for a song.</Text>
          <Icon name="search" size={225} color='rgba(255, 255, 255, 0.5)' />
        </View>
      )
    } else {
      return (
        <ScrollView>
          <FlatList
            data={this.props.screenProps.search.results}
            renderItem={({item}) =>
          <ListItem
            onPress={() => this.props.navigation.navigate('Selected', { ...item })}
            containerStyle={{ width: screenWidth }}
            avatar={item.trackphoto}
            rightIcon={{ name: 'playlist-add' }}
            titleStyle={{ color: 'white' }}
            title={item.title}
            subtitle={item.artist} />}
          />
        </ScrollView>
      );
    };
  };

  render() {
    const { screenProps } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/img/cover.jpg')}
          style={styles.background}
          resizeMode="cover"
          opacity={.25}
        />
        <Header navigation={this.props.navigation} avatar={this.props.screenProps.user.user.photoURL} daily={this.props.screenProps.daily} />
        <SearchBar
          ref={ref => this.search = ref}
          value={this.state.query}
          onChangeText={search => this.setState({ query: search })}
          showLoadingIcon={screenProps.search.searching}
          onEndEditing={() => screenProps.searchMusic(this.state.query, screenProps.tracks.tracks)}
          inputStyle={styles.searchInput}
          containerStyle={styles.searchContainer}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='...' />
        <View style={styles.content}>
        {screenProps.search.searching
          ? this.renderLoading()
          : this.renderItems()}
        </View>
      </View>
    )
  };
};

const { width, height } = Dimensions.get('window');
const screenWidth = width - 36
const screenHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f222e',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  text: {
    fontSize: 52,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'Courier New',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    color: 'rgba(255, 255, 255, 0.50)',
  },
  searchInput: {
    width: screenWidth,
    backgroundColor: 'rgba(31, 34, 46, 0.5)'
  },
  searchContainer: {
    borderRadius: 2,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: 'rgba(31, 34, 46, 0.25)'
  }
})
