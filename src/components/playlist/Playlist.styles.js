import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const screenWidth = width - 36;
const screenHeight = width - 76;

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
  badgeContainer: {
    backgroundColor: 'rgba(31, 34, 46, 0.25)',
    height: 20,
    width: 20,
    padding: 2,
  },
  text: {
    fontSize: 42,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.50)',
  },
  textContainer: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    color: '#fff',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
  },
  listTitle: {
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'HelveticaNeue',
    color: '#fff',
  },
  listSubtitle: {
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'HelveticaNeue',
  },
});

export default styles;
