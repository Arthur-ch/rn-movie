import {
  StyleSheet
} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  themeImage: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 3
  },
  label: {
    fontSize: 15,
    color: '#666',
  },
  value: {
    fontSize: 15,
    color: '#333',
  }
})