import React, { Component } from 'react';
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';

const MOVIEURL = 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=10&page_start=0';
const INTERVAL = 3;
export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Movies List',
  };
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      loaded: false,
    }
    // 在ES6中，自定义方法中的this，必须绑定，不然就为空
    this.fetchData = this.fetchData.bind(this)
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
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
        this.setState({
          movieList,
          loaded: true
        });
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
              <Text>Loading...</Text>
            </View>
          ) 
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
})