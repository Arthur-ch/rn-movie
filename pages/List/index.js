import React, { Component } from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import _ from 'lodash';
import {
  Image,
  FlatList,
  ScrollView,
  Text,
  View,
  Animated,
  Button,
} from 'react-native';
import styles from './style';
import { listReducer } from '../../models/reducer';
const store = createStore(listReducer);

const MOVIEURL = 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8';
const INTERVAL = 3;
class Movies extends Component {
  // static navigationOptions = {
  //   title: 'Movies List',
  // };
  unmount = false;
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
                        <View style={styles.listItem} key={i}>
                          <Image
                            source={{
                              uri: item.cover,
                              cache: "reload"
                            }}
                            style={styles.thumbnail}
                          />
                          <View>
                            <Text style={styles.rate}>{item.rate}</Text>
                            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>{item.title}</Text>
                          </View>
                        </View>
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
                <Text style={{ fontSize: 20 }}>{message}</Text>
              </Animated.View>
            </View>
          ) 
        }
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    message,
    movieList,
    loaded,
    page_limit,
    page_start
  } = state;
  return {
    message,
    movieList,
    loaded,
    page_limit,
    page_start
  }
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
        <ConnectedRoot />
      </Provider>
    );
  }
}