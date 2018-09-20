import React, { Component } from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import _ from 'lodash';
import {
  Image,
  FlatList,
  Text,
  View
} from 'react-native';
import styles from './style';
import { listReducer } from '../../reducer';
const store = createStore(listReducer);

const MOVIEURL = 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=10&page_start=0';
const INTERVAL = 3;
class Movies extends Component {
  // static navigationOptions = {
  //   title: 'Movies List',
  // };
  unmount = false;
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      loaded: false,
    }
    // 在ES6中，自定义方法中的this，必须绑定，不然就为空, 除非是箭头函数
    // this.fetchData = this.fetchData.bind(this)
  }
  componentDidMount() {
    _.delay(this.fetchData, 2000);
  }
  componentWillUnmount() {
    // 防止组件卸载后，异步请求setState
    this.unmount = true;
  }
  fetchData = () => {
    fetch(MOVIEURL)
      .then(res => res.json())
      .then(data => {
        const movieList = data.subjects.sort((a, b) => a.rate <= b.rate).map((item, idx)=> {
          return idx % INTERVAL === 0 ? [
            item,
            ...data.subjects.slice(idx + 1, idx + INTERVAL).filter((list) => {
              return list !== undefined
            })
          ] : [];
        }).filter((item) => {
          return item.length !== 0
        })
        if (this.unmount) {
          return new Promise((_, reject) => { reject('component have unmounted!!!') });
        }
        this.setState({
          movieList,
          loaded: true
        });
        console.log('this.props', this.props);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  renderMovie(list) {
    return (
      <View style={styles.list}>
        {
          list.item.map((item, idx) => {
            return (
              <View style={styles.listItem} key={idx}>
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
    )
  }
  render() {
    const { message } = this.props;
    const {
      movieList,
      loaded
    } = this.state;
    return (
      <View style={styles.container}>
        {
          loaded ? (
            <View>
              <FlatList
                data={movieList}
                renderItem={this.renderMovie}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
          ) : (
            <View style={styles.loading}>
              <Text>{message}...</Text>
            </View>
          ) 
        }
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (message) => {
      dispatch({
        type: 'setMessage',
        payload: message,
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
    const { state, actions } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRoot />
      </Provider>
    );
  }
}