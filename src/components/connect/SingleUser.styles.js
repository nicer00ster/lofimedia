import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const screenWidth = width - 76;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width,
    backgroundColor: '#1f222e',
  },
  image: {
    borderWidth: 0.5,
    borderRadius: 1,
    elevation: 6,
    width,
    height: screenWidth,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  imageContainer: {
    ...Platform.select({
      ios: {
        padding: 2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#000',
        shadowOpacity: 0.85,
      },
      android: {
        padding: 2,
      },
    }),
  },
  text: {
    fontSize: 24,
    color: '#efefef',
    margin: 5,
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 6,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  divider: {
    height: 1,
    backgroundColor: '#efefef',
  },
});

export default styles;
