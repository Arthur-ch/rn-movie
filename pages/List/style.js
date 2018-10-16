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
  },
  rateBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
  rateText: {
    fontSize: 15,
    color: '#e09015',
  },
  ratingStar: {
    marginTop: 2.5,
    width: 80,
    height: 11,
    overflow: 'hidden'
  },
  startImage: {
    width: 55,
    height: 121,
    position: 'relative',
    // top: -110, 0 颗
    // top: -99,  1 颗
    // top: -88   2 颗
    // top: -77   3 颗
    // top: -66,  4 颗
    // top: -55,  5 颗
    // top: -44   6 颗
    // top: -33,  7 颗
    // top: -22,  8 颗  
    // top: -11,  9 颗
    // top: 0    10 颗
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
