import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F5FCFF'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    marginRight: 10,
    width: 115,
    marginBottom: 40
  },
  thumbnail: {
    width: 115,
    height: 160
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  rate: {
    fontSize: 18,
    textAlign: 'center'
  }
});
