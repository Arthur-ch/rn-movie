import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
  },
  btnGroup: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 200,
    // backgroundColor: 'black',
    bottom: 0,
    width: '100%'
  },
  btnForward: {
    backgroundColor: '#4CB4E7',
    width: 100,
    paddingTop: 5,
    paddingBottom: 5,
  },
  btnNext: {
    backgroundColor: '#495A80',
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
