import React, { Component } from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  Text,
  View,
  Animated,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './style';
import url from '../../config/url';
import { listReducer } from '../../models/reducer';
const store = createStore(listReducer);
const topArr = [-110, -99, -88, -77, -66, -55, -44, -33, -22, -11, 0];
const MOVIEURL = `${url.MOVIEURL}/j/search_subjects?type=movie&tag=热门`;
class Movies extends Component {
  // static navigationOptions = {
  //   title: 'Movies List',
  // };
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: new Animated.Value(0)
    }
    // 在ES6中，自定义方法中的this，必须绑定，不然就为空, 除非是箭头函数
    // this.fetchMovieList = this.fetchMovieList.bind(this)
  }
  componentDidMount() {
    this.fetchMovieList();
    Animated.timing(
      this.state.fadeIn,
      {
        toValue: 1,
        duration: 1000,
        // useNativeDriver: true
      }
    ).start();
  }
  componentWillUnmount() {
    // 防止组件卸载后，异步请求setState
    this.unmount = true;
  }
  fetchMovieList = (page_start = 0, page_limit = 12) => {
    this.props.setPage_start({ page_start: page_start / page_limit });
    this.props.setLoaded({ loaded: false });
    _.delay(() => {
      fetch(`${MOVIEURL}&page_limit=${page_limit}&page_start=${page_start}`)
        .then(res => res.json())
        .then(data => {
          const movieList = data.subjects;
          if (this.unmount) {
            return new Promise((_, reject) => { reject('component have unmounted!!!') });
          }
          this.props.setMovieList({ movieList });
          this.props.setLoaded({ loaded: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  }
  onNext = () => {
    const { page_start, page_limit } = this.props;
    this.fetchMovieList((page_start + 1) * page_limit, page_limit );
  }
  onForward = () => {
    const { page_start, page_limit } = this.props;
    this.fetchMovieList((page_start - 1) * page_limit || 0, page_limit);
  }
  goDetail = (item) => {
    const { navigation } = this.props;
    navigation.navigate('detail', { id: item.id });
  }
  render() {
    const {
      message,
      movieList,
      loaded,
    } = this.props;
    const {
      fadeIn
    } = this.state;
    return (
      <View style={styles.container}>
        {
          loaded ? (
            <View>
              <ScrollView>
                <View
                  style={styles.list}
                >
                  {
                    movieList.map((item, i) => {
                      return (
                        <TouchableWithoutFeedback key={i} onPress={() => { this.goDetail(item) }}>
                          <View style={styles.listItem}>
                            <Image
                              source={{
                                uri: item.cover,
                                cache: "reload"
                              }}
                              style={styles.thumbnail}
                            />
                            <View>
                              <View style={styles.rateBox}>
                                <View style={styles.ratingStar}>
                                  <Image
                                    source={require('../../asset/ic_rating_s.png')}
                                    style={[styles.startImage, {
                                      top: topArr[Math.round(item.rate)]
                                    }]}
                                  />
                                </View>
                                <View style={styles.rate}>  
                                  <Text style={styles.rateText}>{item.rate}</Text>
                                </View>
                              </View>
                              <View>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>{item.title}</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      )
                    })
                  }
                </View>
              </ScrollView>
              <View style={styles.btnGroup}>
                <View style={styles.btnForward}>
                  <Button
                    onPress={this.onForward}
                    title="Forward"
                    color="#FFFFFF"
                    // onPress={() => { Alert.alert("你点击了按钮！"); }}
                  />
                </View>
                <View style={styles.btnNext}>
                  <Button
                    onPress={this.onNext}
                    title="Next"
                    color="#FFFFFF"
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.loading}>
              <Animated.View
                style={{
                  opacity: fadeIn,
                  transform: [{
                    scale: fadeIn.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 0.5, 1],
                      perspective: 1000
                    })
                  }]
                }}
              >
                <Text style={{ fontSize: 40 }}>{message}</Text>
              </Animated.View>
            </View>
          ) 
        }
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message,
    movieList,
    loaded,
    page_limit,
    page_start
  } = state;
}
const mapDispatchToProps = (dispatch) => {
  return {
    setMovieList: (data) => {
      dispatch({
        type: 'setMovieList',
        payload: { ...data },
      })
    },
    setLoaded: (data) => {
      dispatch({
        type: 'setLoaded',
        payload: { ...data },
      })
    },
    setPage_start: (data) => {
      dispatch({
        type: 'setPage_start',
        payload: { ...data },
      })
    }
  }
}
const ConnectedRoot = connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);

export default class List extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRoot navigation={this.props.navigation}/>
      </Provider>
    );
  }
}