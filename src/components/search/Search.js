import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, FlatList, ScrollView } from 'react-native';
import { Icon, SearchBar, ListItem } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import Header from '../Header';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      results: '',
      search: '',
      searching: false
    };
  };
  renderLoading() {
    return <Spinner type="9CubeGrid" size={100} color="white" style={{ flex: 1, alignSelf: 'center' }}/>
  };
  searchMusic() {
    this.setState({ searching: true, results: this.props.screenProps.tracks.tracks })
    setTimeout(() => {
      this.setState({ searching: false })
    }, 2000)
  }
  renderItems() {
    if(!this.state.results) {
      return (
        <React.Fragment>
          <Text style={styles.text}>Search for a song.</Text>
          <Icon name="search" size={225} color='rgba(255, 255, 255, 0.5)' />
        </React.Fragment>
      )
    } else {
      return (
        <ScrollView>
          <FlatList
            data={this.props.screenProps.tracks.tracks}
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
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/img/cover.jpg')}
          style={styles.background}
          resizeMode="cover"
          opacity={.25}
        />
        <Header navigation={this.props.navigation} avatar={this.props.screenProps.user.user.photoURL} daily={this.props.screenProps.daily} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <SearchBar
            ref={ref => this.search = ref}
            value={this.state.search}
            onChangeText={search => this.setState({ search })}
            showLoadingIcon={this.state.searching}
            onEndEditing={() => this.searchMusic()}
            inputStyle={styles.searchInput}
            containerStyle={styles.searchContainer}
            icon={{ type: 'font-awesome', name: 'search' }}
            placeholder='...' />
          {
            this.state.searching
            ? this.renderLoading()
            : this.renderItems()
          }
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
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  text: {
    fontSize: 64,
    fontFamily: 'sans-serif-thin',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    flex: 1,
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
