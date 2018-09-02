import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
    fontSize: 36,
    fontWeight: '200',
    textAlign: 'center',
    color: '#1f222e',
    margin: 5,
    padding: 5,
    height: 100,
  },
  drawerImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'HelveticaNeue',
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: '#1f222e',
  },
  social: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancel: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: 12,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  copyright: {
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'HelveticaNeue',
    alignSelf: 'flex-end',
    margin: 10,
  },
  list: {
    backgroundColor: 'transparent',
  },
  listitem: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});

export default styles;
