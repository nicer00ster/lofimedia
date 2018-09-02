import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = width - 8;
const imageHeight = width - 76;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(31, 34, 46, 0.75)',
  },
  image: {
    ...Platform.select({
      ios: {
        borderWidth: 0,
        width,
        height: imageHeight,
      },
      android: {
        borderWidth: 1,
        width,
        height: imageHeight,
        backgroundColor: '#000',
        elevation: 8,
      },
    }),
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
  textContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 2,
    margin: 12,
    elevation: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    color: '#fff',
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  info: {
    width: imageWidth,
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgba(31, 34, 46, 0.5)',
    borderWidth: 0,
    padding: 10,
    borderRadius: 2,
    elevation: 2,
  },
});

export default styles;
