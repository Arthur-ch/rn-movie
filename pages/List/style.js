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
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 50,
  },
  listItem: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 115,
  },
  thumbnail: {
    width: '100%',
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
    flex: 4,
    paddingTop: 5,
    paddingBottom: 5,
  },
  btnNext: {
    backgroundColor: '#495A80',
    flex: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
