import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const screenWidth = width - 36;

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

export default styles;
