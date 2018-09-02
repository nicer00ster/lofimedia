import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const imageHeight = width - 76;
const imageWidth = width - 24;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 2,
    width: imageWidth,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
  },
  iconOverlay: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    margin: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'transparent',
    width: 'auto',
    height: imageHeight,
  },
  imageContainer: {
    ...Platform.select({
      ios: {
        borderRadius: 2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 16 },
        shadowColor: '#000',
        shadowOpacity: 0.75,
      },
      android: {
        elevation: 12,
        backgroundColor: '#000',
        borderRadius: 2,
      },
    }),
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
    marginLeft: 25,
  },
});

export default styles;
