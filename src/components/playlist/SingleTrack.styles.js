import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = width;
const imageHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  play: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  add: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    position: 'absolute',
    padding: 10,
  },
  image: {
    borderWidth: 0.5,
    borderRadius: 1,
    width: imageWidth,
    height: imageHeight,
  },
  imageText: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 36,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue',
    fontWeight: '800',
    color: '#fff',
    margin: 10,
  },
  artist: {
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue',
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
    margin: 12,
  },
  heartContainer: {
    position: 'absolute',
    paddingBottom: 5,
  },
  heartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: 'rgba(31, 34, 46, 0.25)',
    height: 25,
    width: 25,
    padding: 5,
    marginLeft: 15,
  },
});

export default styles;
