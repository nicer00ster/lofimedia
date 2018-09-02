import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const screenWidth = width - 36;
const screenHeight = width - 76;

const styles = StyleSheet.create({
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
